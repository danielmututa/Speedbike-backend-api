const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [100, 'Event title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true,
    maxlength: [500, 'Event description cannot exceed 500 characters']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
    validate: {
      validator: function(value) {
        return value >= new Date(); // Ensure event date is not in the past
      },
      message: 'Event date must be in the future'
    }
  },
  time: {
    type: String,
    required: [true, 'Event time is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true,
    maxlength: [200, 'Event location cannot exceed 200 characters']
  },
  ticketPrice: {
    type: Number,
    required: [true, 'Ticket price is required'],
    min: [0, 'Ticket price cannot be negative']
  },
  capacity: {
    type: Number,
    required: [true, 'Event capacity is required'],
    min: [1, 'Event capacity must be at least 1']
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  }],
  isPromoted: {
    type: Boolean,
    default: false // Indicates if the event is promoted
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  image: {
    data: Buffer,
    contentType: String,
  }
}, {
  timestamps: true
});

// Index for faster queries on date and title
eventSchema.index({ date: 1, title: 1 });

module.exports = mongoose.model('Event', eventSchema);
