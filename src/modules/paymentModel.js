

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


  const paymentSchema = new Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'bank', 'paypal'],
      required: [true, 'Payment method is required'],
    },
    paymentDetails: {
      card: {
        cardNumber: String,
        expirationDate: String,
        cvv: String,
        cardHolderName: String
      },
      bank: {
        accountNumber: String,
        routingNumber: String
      },
      paypal: {
        paypalEmail: String
      }
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount must be a positive number'],
    },
    currency: {
      type: String,
      default: 'USD',
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
// Make userId and paymentMethod unique together to avoid duplicates
paymentSchema.index({ userId: 1, paymentMethod: 1 }, { unique: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
