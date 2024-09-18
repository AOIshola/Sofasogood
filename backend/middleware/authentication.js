const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CustomError = require('../errors');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(`Token from authenticate ${token}`)

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decodedToken);
    const user = await User.findById(decodedToken.user.userId);
    // console.log(user) 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    console.log(`AuthMiddUser: ${user}`)
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user.role
        if (!roles.includes(userRole)) {
            throw new CustomError.UnauthorizedError(
                'Unauthorized to access this route'
            );
        }
    };
}

module.exports = { authenticate, authorizePermissions };