const dotenv = require('dotenv');
const express = require('express');

const { connectToDatabase } = require('./database/connect');
const { errorHandler } = require('./middleware/errorHandler');

const userRouter = require('./routers/userRouter');
const ticketRouter = require('./routers/ticketRouter');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(`Error name: ${err.name}`);
  console.log(`Error message: ${err.message}`);

  process.exit(1);
});

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

connectToDatabase();

const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

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
app.use('/api/tickets', ticketRouter);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(`Error name: ${err.name}`);
  console.log(`Error message: ${err.message}`);

  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
