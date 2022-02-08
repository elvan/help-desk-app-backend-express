const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const MONGODB_URL =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/help-desk-app-backend';

exports.connectToDatabase = async () => {
  try {
    const defaultConnection = await mongoose.connect(MONGODB_URL);
    console.log(`Connected to database ${defaultConnection.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to database ${error.message}`);
    process.exit(1);
  }
};
