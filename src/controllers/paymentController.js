const paymentService = require('../services/paymentService'); // Adjust the path as necessary

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const paymentData = req.body; // Extract payment data from the request body
    console.log('Incoming Payment Data:', paymentData); // Log payment data to verify

    // Validate card payment details
    if (paymentData.paymentMethod === 'card') {
      if (!paymentData.paymentDetails.card || !paymentData.paymentDetails.card.cardNumber || !paymentData.paymentDetails.card.cardHolderName) {
        throw new Error('Missing required card payment details');
      }
    }

    // Proceed to create the payment if validation passes
    const newPayment = await paymentService.createPayment(paymentData);
    res.status(201).json(newPayment); // Respond with the created payment
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error: error.message });
  }
};


// Fetch a payment by ID
const getPayment = async (req, res) => {
  try {
    const paymentId = req.params.id; // Extract payment ID from the request parameters
    
    // Call the service to fetch the payment
    const payment = await paymentService.getPayment(paymentId);
    
    // If payment not found, respond with an error
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    // Respond with the payment entry
    res.status(200).json(payment);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error fetching payment', error: error.message });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    console.log('Fetching all payments');
    
    // Call the service to fetch all payments
    const payments = await paymentService.getAllPayments();
    
    // Respond with the list of payments
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    
    // Handle errors
    res.status(500).json({
      message: 'Error fetching payments',
      error: error.message
    });
  }
};

// Export the functions for use in other modules
module.exports = {
  createPayment,
  getPayment,
  getAllPayments
};
