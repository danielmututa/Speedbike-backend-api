const Payment = require('../modules/paymentModel'); // Adjust the path as necessary

// Create a new payment
const createPayment = async (paymentData) => {
  try {
    if (paymentData.paymentMethod === 'card') {
      if (!paymentData.paymentDetails.card || 
          !paymentData.paymentDetails.card.cardNumber || 
          !paymentData.paymentDetails.card.cardHolderName) {
        throw new Error('Missing required card payment details');
      }
    }
    
    const payment = new Payment(paymentData);
    await payment.save();
    return payment;
  } catch (error) {
    throw new Error('Failed to create payment: ' + error.message);
  }
};
// Fetch a payment by ID
const getPayment = async (paymentId) => {
  try {
    const payment = await Payment.findById(paymentId); // Fetch payment by ID
    if (!payment) throw new Error('Payment not found'); // Throw error if not found
    return payment; // Return the payment entry
  } catch (error) {
    throw new Error('Failed to fetch payment: ' + error.message);
  }
};

// Get all payments
const getAllPayments = async () => {
  try {
    const payments = await Payment.find({}); // Fetch all payments
    return payments;
  } catch (error) {
    throw new Error('Failed to fetch payments: ' + error.message);
  }
};

// Export the functions for use in other modules
module.exports = {
  createPayment,
  getPayment,
  getAllPayments
};
