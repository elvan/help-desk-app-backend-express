const asyncHandler = require('express-async-handler');

const AppError = require('../errors/AppError');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');

// @route GET /api/tickets
// @access Protected
exports.listTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    throw new AppError('User not authenticated.', 401);
  }

  const tickets = await Ticket.find({ user: user._id });

  if (!tickets) {
    throw new AppError('No tickets found', 404);
  }

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
    throw new AppError('User not authenticated.', 401);
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

// @route GET /api/tickets/:id
// @access Protected
exports.getTicket = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(req.user.id);

  if (!user) {
    throw new AppError('User not authenticated.', 401);
  }

  const ticket = await Ticket.findById(id);

  if (!ticket) {
    throw new AppError('Ticket not found', 404);
  }

  if (ticket.user.toString() !== user._id.toString()) {
    throw new AppError('User not authorized', 403);
  }

  res.status(200).json({
    isSuccess: true,
    message: 'Ticket fetched successfully.',
    ticket: ticket,
  });
});

// @route PUT /api/tickets/:id
// @access Protected
exports.updateTicket = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { product, description, status } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    throw new AppError('User not authenticated.', 401);
  }

  const ticket = await Ticket.findById(id);

  if (!ticket) {
    throw new AppError('Ticket not found', 404);
  }

  if (ticket.user.toString() !== user._id.toString()) {
    throw new AppError('User not authorized', 403);
  }

  ticket.product = product;
  ticket.description = description;
  ticket.status = status;

  await ticket.save();

  res.status(200).json({
    isSuccess: true,
    message: 'Ticket updated successfully.',
    ticket: ticket,
  });
});

// @route DELETE /api/tickets/:id
// @access Protected
exports.deleteTicket = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(req.user.id);

  if (!user) {
    throw new AppError('User not authenticated.', 401);
  }

  const ticket = await Ticket.findById(id);

  if (!ticket) {
    throw new AppError('Ticket not found', 404);
  }

  if (ticket.user.toString() !== user._id.toString()) {
    throw new AppError('User not authorized', 403);
  }

  await ticket.remove();

  res.status(200).json({
    isSuccess: true,
    message: 'Ticket deleted successfully.',
  });
});
