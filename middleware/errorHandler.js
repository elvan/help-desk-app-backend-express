const dotenv = require('dotenv');
const AppError = require('../errors/AppError');

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';

exports.errorHandler = (err, req, res, next) => {
  if (NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      isError: true,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (NODE_ENV === 'production') {
    let error = { ...err };

    error.message = err.message;
    error.statusCode = err.statusCode || 500;

    // Wrong Mongoose Object ID Error
    if (err.name === 'CastError') {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new AppError(message, 400);
    }

    // Handling Mongoose Validation Error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new AppError(message, 400);
    }

    // Handling Mongoose duplicate key errors
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new AppError(message, 400);
    }

    // Handling wrong JWT error
    if (err.name === 'JsonWebTokenError') {
      const message = 'JSON Web Token is invalid.';
      error = new AppError(message, 400);
    }

    // Handling Expired JWT error
    if (err.name === 'TokenExpiredError') {
      const message = 'JSON Web Token is expired.';
      error = new AppError(message, 400);
    }

    res.status(error.statusCode).json({
      isError: true,
      message: error.message || 'Internal Server Error',
    });
  }
};
