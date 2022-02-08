const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGODB_SERVER =
  process.env.MONGODB_SERVER || 'mongodb://localhost:27017';

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Help Desk server',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
