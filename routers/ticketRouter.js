const express = require('express');

const { protect } = require('../middleware/authMiddleware');
const {
  listTickets,
  createTicket,
} = require('../controllers/ticketController');

const router = express.Router();

router.get('/', protect, listTickets);

router.post('/', protect, createTicket);

module.exports = router;
