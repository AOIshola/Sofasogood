const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const createTokenUser = require('../utils/createTokenUser');
const sendResetPassswordEmail = require('../utils/sendResetPasswordEmail');
const createHash = require('../utils/createHash');

require('dotenv').config();

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // console.log(name, email, password);
    
        if (!email || !name || !password) {
            res.status(StatusCodes.BAD_REQUEST).json({msg: 'Please, enter the necessary credentials'});
            throw new CustomError.BadRequestError('Please, enter the necessary credentials');
        }
        
        const emailAlreadyExists = await User.findOne({ email });
        
        if (emailAlreadyExists) {
            res.status(StatusCodes.BAD_REQUEST).json({msg: 'Email already exists'});
            throw new CustomError.BadRequestError('Email already exists')
        }
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);
    
        const isFirstAccount = (await User.countDocuments({})) === 0;
        const role = isFirstAccount ? 'admin' : 'user';
    
        const user = new User({ name, email, password, role });
        await user.save();
        return res.status(StatusCodes.CREATED).json({ msg: 'Registration Successful!' }); 
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        // const origin = req.get('origin');
        // console.log(origin);
        const { email, password } = req.body;
    
        if (!email || !password) {
            res.status(StatusCodes.UNAUTHORIZED).json({msg: 'Please provide email and password'});
            throw new CustomError.UnauthenticatedError('Please provide email and password');
        }
    
        const user = await User.findOne({ email });
        if (!user) {
            res.status(StatusCodes.UNAUTHORIZED).json({msg: 'No user with the email exists.'});
            throw new CustomError.UnauthenticatedError('No user with the email exists.');
        }
    
        const passwordMatch = await user.comparePassword(password)
        console.log('PasswordMatch:', passwordMatch)
        if (!passwordMatch) {
            res.status(StatusCodes.UNAUTHORIZED).json({msg: 'Password is incorrect'});
            throw new CustomError.UnauthenticatedError('Password is incorrect');
        }
        const tokenUser = createTokenUser(user);
        console.log(user.password)
        jwt.sign({ user: tokenUser }, process.env.SECRET_KEY, { expiresIn: '1h'}, (err, token) => {
            if (err) throw err;
            return res.status(StatusCodes.OK).json({ user: tokenUser, token, })
        });
    } catch (error) {
        next(error);
    }
};

const getProfile = async (req, res, next) => {
    try {
        const { user } = req;
        if (!user) {
            res.status(StatusCodes.UNAUTHORIZED).json({msg: 'No user found'});
            throw new CustomError.UnauthenticatedError('No user found');
        }
        
        const userProfile = await User.findById(user._id).select('-password -passwordToken -passwordTokenExpirationDate');
        console.log(`userProfile: ${userProfile}`);
        if (!userProfile) {
            res.status(StatusCodes.UNAUTHORIZED).json({msg: 'User not found'});
            throw new CustomError.NotFoundError('User not found');
        }
        
        res.status(StatusCodes.OK).json({ user: userProfile });
    } catch (error) {
        next(error);
    }
};


const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(StatusCodes.BAD_REQUEST).json({msg: 'Please provide valid email'});
            throw new CustomError.BadRequestError('Please provide valid email');
        }
        
        const user = await User.findOne({ email });
        if (user) {
            const resetToken = crypto.randomBytes(70).toString('hex');
            const token = createHash(resetToken);
            const origin = `${req.get('origin')}`;
            // console.log(`user: ${user.name} -> email: ${user.email}`);
            console.log(resetToken);
            console.log(`The origin: `+origin);
            
            await sendResetPassswordEmail({
                name: user.name,
                email: user.email,
                resetToken,
                origin,
            });
            
            const expiryTime = 1000 * 60 * 10;
            const resetTokenExpirationTime = new Date(Date.now() + expiryTime);
            
            user.passwordToken = token;
            user.passwordTokenExpirationDate = resetTokenExpirationTime;
            
            await user.save();
        }
        return res
        .status(StatusCodes.OK)
        .json({ msg: 'Please check your email for reset password link' });
    } catch (error) {
        next(error);
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const { token, email, password } = req.body;
        if (!token || !email || !password) {
            res.status(StatusCodes.BAD_REQUEST).json({msg: 'Please provide all values'});
            throw new CustomError.BadRequestError('Please provide all values');
      }
      const user = await User.findOne({ email });
    
      if (user) {
        const currentDate = new Date();
    
        if (
          user.passwordToken === createHash(token) &&
          user.passwordTokenExpirationDate > currentDate
        ) {
          user.password = password;
          user.passwordToken = null;
          user.passwordTokenExpirationDate = null;
        //   console.log('DONE!!!')
          await user.save();
          console.log(`Post Save: ${user.password}`)
        }
      }
    
      res.status(StatusCodes.OK).json({ message: 'Password successfully reset' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    getProfile,
    forgotPassword,
    resetPassword
};