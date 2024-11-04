const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['Card', 'Bank Transfer', 'PayPal', 'Stripe'],
    required: true
  },
  paymentDetails: {
    card: {
      cardNumber: {
        type: String,
        validate: {
          validator: function(v) {
            // Basic credit card number validation
            return /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11})$/.test(v);
          },
          message: 'Invalid card number format'
        }
      },
      expirationDate: {
        type: String,
        validate: {
          validator: function(v) {
            // MM/YY format validation
            return /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(v);
          },
          message: 'Expiration date must be in MM/YY format'
        }
      },
      cvv: {
        type: String,
        validate: {
          validator: function(v) {
            // CVV validation (3 or 4 digits)
            return /^[0-9]{3,4}$/.test(v);
          },
          message: 'CVV must be 3 or 4 digits'
        }
      },
      cardHolderName: {
        type: String,
        trim: true
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
            // Basic account number validation
            return /^[0-9]{8,17}$/.test(v);
          },
          message: 'Invalid bank account number'
        }
      },
      routingNumber: {
        type: String,
        validate: {
          validator: function(v) {
            // US routing number validation
            return /^[0-9]{9}$/.test(v);
          },
          message: 'Invalid routing number'
        }
      },
      accountHolderName: {
        type: String,
        trim: true
      }
    },
    paypal: {
      paypalEmail: {
        type: String,
        lowercase: true,
        validate: {
          validator: function(v) {
            // Email validation
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
    }
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be a positive number']
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'CAD']
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Successful', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  additionalNotes: {
    type: String,
    trim: true,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Virtual property for formatted amount
paymentSchema.virtual('formattedAmount').get(function() {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: this.currency 
  }).format(this.amount);
});

// Method to check payment validity
paymentSchema.methods.isValidPayment = function() {
  return this.paymentStatus === 'Successful';
};

// Remove unique constraint on userId and amount to allow duplicate payments of the same amount per user
// paymentSchema.index({ userId: 1, amount: 1 }, { unique: true });

// Static method to create a payment
paymentSchema.statics.createPayment = async function(paymentData) {
  const payment = new this(paymentData);
  return await payment.save();
};

module.exports = mongoose.model('Payment', paymentSchema);
