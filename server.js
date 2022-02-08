const dotenv = require('dotenv');
const express = require('express');

const { connectToDatabase } = require('./database/connect');
const { errorHandler } = require('./middleware/errorHandler');

const userRouter = require('./routers/userRouter');

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

connectToDatabase();

const app = express();

// To accept raw json data
app.use(express.json());

// To accept url encoded form data
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Help Desk server',
  });
});

app.use('/api/users', userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
