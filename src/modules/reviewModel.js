const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  ownerResponse: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);