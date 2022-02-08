const asyncHandler = require('express-async-handler');

const AppError = require('../errors/AppError');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');

// @route GET /api/tickets
// @access Protected
exports.listTickets = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return new AppError('User not found', 404);
  }

  const tickets = await Ticket.find({ user: user._id });

  res.status(200).json({
    isSuccess: true,
    message: 'Tickets fetched successfully.',
    tickets: tickets,
  });
});

// @route POST /api/tickets
// @access Protected
exports.createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    throw new AppError('Please provide product and description', 400);
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const ticket = await Ticket.create({
    user: user._id,
    product: product,
    description: description,
    status: 'new',
  });

  res.status(201).json({
    isSuccess: true,
    message: 'Ticket created successfully.',
    ticket: ticket,
  });
});
