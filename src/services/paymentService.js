const Payment = require('../modules/paymentModel'); // Adjust the path as necessary

// Create or update a payment
const createPayment = async (paymentData) => {
  try {
    // Check if a payment with the same userId and paymentMethod already exists
    const existingPayment = await Payment.findOne({
      userId: paymentData.userId,
      paymentMethod: paymentData.paymentMethod
    });

    if (existingPayment) {
      // If payment exists, update the existing one with new details
      existingPayment.paymentDetails = paymentData.paymentDetails;
      existingPayment.amount = paymentData.amount;
      existingPayment.currency = paymentData.currency;
      existingPayment.status = 'pending'; // Set status to pending or as needed

      await existingPayment.save(); // Save the updated payment
      console.log('Payment updated:', existingPayment);
      return existingPayment;
    } else {
      // If no existing payment, create a new one
      const payment = new Payment(paymentData);
      await payment.save();
      console.log('Payment created:', payment);
      return payment;
    }
  } catch (error) {
    throw new Error('Failed to create or update payment: ' + error.message);
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
