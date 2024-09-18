const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Review = require('./Review');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
},
{ timestamps: true }
);

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password)
    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.pre('remove', async function (next) {
  try {
    await Review.deleteMany({ user: this._id }).exec();
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function(password) {
  console.log(`user_pass: ${this.password}`);
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);
module.exports = User;
