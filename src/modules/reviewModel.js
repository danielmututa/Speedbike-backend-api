const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  ownerResponse: {
    type: String,
    default: ''
  },
  ownerResponseAt: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'replied'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Remove unique index on email to allow multiple reviews with the same email
// No index on email, so users can rate multiple times with the same email

module.exports = mongoose.model('Review', reviewSchema);
