const asyncHandler = require('express-async-handler');

const AppError = require('../errors/AppError');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');

// @route GET /api/tickets
// @access Protected
exports.listTickets = asyncHandler(async (req, res) => {
  const tickets = [];

  res.status(200).json({
    isSuccess: true,
    message: 'Tickets fetched successfully.',
    tickets: tickets,
  });
});

// @route POST /api/tickets
// @access Protected
exports.createTicket = asyncHandler(async (req, res) => {
  res.status(200).json({
    isSuccess: true,
    message: 'Ticket created successfully.',
  });
});
