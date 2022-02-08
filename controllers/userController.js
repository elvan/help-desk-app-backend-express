// @ts-nocheck

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'this is a secret';

// @route /api/users/register
// @access Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Check for existing user
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(400);
    throw new Error('User already exists');
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
    // If user is not created
    throw new Error('User not created');
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
    res.status(400);
    throw new Error('User does not exist');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400);
    throw new Error('Invalid email or password');
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
    res.status(400);
    throw new Error('User does not exist');
  }

  res.status(200).json({
    message: 'Get current user successfully',
    user: user,
  });
});

const generateToken = (id) => {
  return jwt.sign({ id: id }, JWT_SECRET, { expiresIn: '30d' });
};
