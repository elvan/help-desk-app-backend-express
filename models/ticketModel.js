const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: String,
      required: [true, 'Please select a product or departement'],
      enum: [
        'Books',
        'Movies',
        'Music',
        'Games',
        'Electronics',
        'Computers',
        'Home',
        'Garden',
        'Tools',
        'Grocery',
        'Health',
        'Beauty',
        'Toys',
        'Kids',
        'Baby',
        'Clothing',
        'Shoes',
        'Jewelery',
        'Sports',
        'Outdoors',
        'Automotive',
        'Industrial',
      ],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Please enter a description of the issue'],
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'open', 'closed', 're-opened', 'resolved'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
