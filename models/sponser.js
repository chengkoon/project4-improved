const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

// Sponser Schema
const SponsorSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profileDescription: {
    type: String,
    required: true
  },
  itemsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
})

module.exports = mongoose.model('Sponsor', SponsorSchema);
