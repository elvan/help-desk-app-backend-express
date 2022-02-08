const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

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

  if (newUser) {
    res.status(200).json({
      message: 'Register route is working',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  }

  // If user is not created
  throw new Error('User not created');
});

// @route /api/users/login
// @access Public
exports.loginUser = asyncHandler((req, res) => {
  res.status(200).json({
    message: 'Login route is working',
  });
});
