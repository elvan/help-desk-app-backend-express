// @ts-nocheck

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const AppError = require('../errors/AppError');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'this is a secret';

// @route /api/users/register
// @access Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    throw new AppError('Please provide all required fields', 400);
  }

  // Check for existing user
  const user = await User.findOne({ email: email });

  if (user) {
    throw new AppError('User already exists', 400);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  if (!newUser) {
    throw new AppError('User not created', 500);
  }

  res.status(200).json({
    message: 'User created successfully',
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    },
  });
});

// @route /api/users/login
// @access Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new AppError('User does not exist', 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  res.status(200).json({
    message: 'User logged in successfully',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    },
  });
});

exports.getCurrentUser = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  if (!user) {
    throw new AppError('User does not exist', 404);
  }

  res.status(200).json({
    message: 'Get current user successfully',
    user: user,
  });
});

const generateToken = (id) => {
  return jwt.sign({ id: id }, JWT_SECRET, { expiresIn: '30d' });
};
