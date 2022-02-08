const express = require('express');

const { protect } = require('../middleware/authMiddleware');
const {
  listTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');

const router = express.Router();

router.get('/', protect, listTickets);

router.post('/', protect, createTicket);

router.get('/:id', protect, getTicket);

router.put('/:id', protect, updateTicket);

router.delete('/:id', protect, deleteTicket);

module.exports = router;
