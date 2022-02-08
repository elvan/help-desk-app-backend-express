// @ts-nocheck

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'this is a secret';

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      // Check if user still exists
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Invalid token');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  }
});
