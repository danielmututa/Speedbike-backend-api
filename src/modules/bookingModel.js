const mongoose = require('mongoose');

const bikeBookingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  bikeRegistration: {
    type: String,
    required: [true, 'Bike registration is required'],
    uppercase: true,
    trim: true
  },
  bikeModel: {
    type: String,
    required: [true, 'Bike model is required'],
    trim: true
  },
  bikeBrand: {
    type: String,
    required: [true, 'Bike brand is required'],
    enum: ['BMW', 'Yamaha', 'Honda', 'Kawasaki', 'Ducati', 'Other']
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: [
      'Regular Maintenance', 
      'Oil Change', 
      'Brake Service', 
      'Tire Replacement', 
      'Full Tune-up', 
      'Diagnostic Check', 
      'Electrical System Check', 
      'Other'
    ]
  },
  specificParts: {
    type: [{
      partName: {
        type: String,
        required: [true, 'Part name is required'],
        trim: true
      },
      quantity: {
        type: Number,
        default: 1,
        min: [1, 'Quantity must be at least 1']
      },
      additionalDetails: {
        type: String,
        trim: true,
        maxlength: [200, 'Additional details cannot exceed 200 characters']
      }
    }],
    validate: [
      {
        validator: function(parts) {
          return parts.length <= 5; // Limit to 5 parts
        },
        message: 'You can specify up to 5 parts'
      }
    ]
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['Card', 'Cash', 'Bank Transfer']
  },
  paymentAmount: {
    type: Number,
    required: [true, 'Payment amount is required'],
    min: [0, 'Payment amount cannot be negative']
  },
  bookingDate: {
    type: Date,
    required: [true, 'Booking date is required'],
    validate: {
      validator: function(value) {
        return value >= new Date(); // Ensure booking date is not in the past
      },
      message: 'Booking date must be in the future'
    }
  },
  bookingTime: {
    type: String,
    required: [true, 'Booking time is required'],
    trim: true
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Rescheduled', 'Completed']
  },
  additionalNotes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
userId: {
  type: mongoose.Schema.Types.ObjectId,
  required: [true, 'User ID is required']

}
}, {
  timestamps: true
});

// Unique compound index to prevent duplicate bookings
bikeBookingSchema.index({ email: 1, paymentAmount: 1, userId: 1 }, { unique: true });

// Custom method to check and create booking
bikeBookingSchema.statics.createBooking = async function(bookingData) {
  // Create the booking without checking for unique Email
  const booking = new this(bookingData);
  return await booking.save();
};

module.exports = mongoose.model('BikeBooking', bikeBookingSchema);
