const paymentService = require('../services/paymentService'); // Adjust the path as necessary

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const paymentData = req.body; // Extract payment data from the request body
    const newPayment = await paymentService.createPayment(paymentData); // Call the service to create a payment
    res.status(201).json(newPayment); // Respond with the created payment
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error: error.message }); // Handle errors
  }
};

// Fetch a payment by ID
const getPayment = async (req, res) => {
  try {
    const paymentId = req.params.id; // Extract payment ID from the request parameters
    const payment = await paymentService.getPayment(paymentId); // Call the service to fetch the payment
    res.status(200).json(payment); // Respond with the payment entry
  } catch (error) {
    res.status(404).json({ message: 'Error fetching payment', error: error.message }); // Handle not found or other errors
  }
};

// Export the functions for use in other modules
module.exports = {
  createPayment,
  getPayment,
};
