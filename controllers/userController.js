const asyncHandler = require('express-async-handler');

// @route /api/users/register
// @access Public
exports.registerUser = asyncHandler((req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  res.status(200).json({
    message: 'Register route is working',
  });
});

// @route /api/users/login
// @access Public
exports.loginUser = asyncHandler((req, res) => {
  res.status(200).json({
    message: 'Login route is working',
  });
});
