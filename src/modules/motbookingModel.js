const mongoose = require('mongoose');

const motSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  bikeRegistrationNumber: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  bikeMake: {
    type: String,
    required: true,
    trim: true
  },
  bikeModel: {
    type: String,
    required: true,
    trim: true
  },
  engineSize: {
    type: Number,
    required: true
  },
  motDate: {
    type: Date,
    required: true
  },
  motCenter: {
    type: String,
    required: true,
    enum: ['Center 1', 'Center 2', 'Center 3']
  },
  serviceRequired: {
    type: String,
    required: true,
    enum: [
      'Oil Change',
      'Tire Replacement',
      'Brake Pads',
      'Chain Replacement',
      'Air Filter',
      'Spark Plug',
      'Battery Replacement',
      'Other (please specify)'
    ]
  },
  additionalServices: [
    {
      type: String,
      enum: [
        'Wheel Alignment',
        'Suspension Check',
        'Electrical System Check',
        'Exhaust System Check'
      ]
    }
  ],
  paymentMethod: {
    type: String,
    required: true,
    enum: ['PayPal', 'Stripe', 'Bank Transfer']
  },
  paymentAmount: {
    type: Number,
    required: true
  },
  paymentDetails: {
    paypal: {
      paypalEmail: {
        type: String,
        lowercase: true,
        validate: {
          validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
          },
          message: 'Invalid PayPal email address'
        }
      }
    },
    stripe: {
      customerID: {
        type: String
      },
      paymentMethodID: {
        type: String
      }
    },
    bankTransfer: {
      bankName: {
        type: String,
        trim: true
      },
      accountNumber: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[0-9]{8,17}$/.test(v);
          },
          message: 'Invalid bank account number'
        }
      },
      routingNumber: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[0-9]{9}$/.test(v);
          },
          message: 'Invalid routing number'
        }
      },
      accountHolderName: {
        type: String,
        trim: true
      }
    }
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Confirmed', 'Cancelled']
  }
}, {
  timestamps: true
});

// Commenting out the unique index on email and paymentAmount to allow duplicates
// motSchema.index({ email: 1, paymentAmount: 1 }, { unique: true });

module.exports = mongoose.model('Mot', motSchema);
