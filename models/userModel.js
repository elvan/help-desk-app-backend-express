const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Please add an email'],
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
