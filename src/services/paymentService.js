const Payment = require('../modules/paymentModel'); // Adjust the path as necessary

// Create a new payment
const createPayment = async (paymentData) => {
  try {
    const payment = new Payment(paymentData); // Create a new payment instance
    await payment.save(); // Save the payment to the database
    return payment; // Return the created payment
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

// Export the functions for use in other modules
module.exports = {
  createPayment,
  getPayment,
};
