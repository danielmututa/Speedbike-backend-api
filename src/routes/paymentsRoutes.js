// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentService = require('../services/paymentService'); // Adjust the path based on your directory structure

// POST create a new payment
router.post('/', async (req, res) => {
  try {
    const paymentData = req.body; // Get data from the request body
    const newPayment = await paymentService.createPayment(paymentData); // Call the service to create a new payment
    res.status(201).json(newPayment); // Respond with the created payment
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error: error.message }); // Handle errors
  }
});

// GET a single payment by ID
router.get('/:id', async (req, res) => {
  try {
    const paymentId = req.params.id; // Get the payment ID from the URL parameters
    const payment = await paymentService.getPayment(paymentId); // Fetch the payment by ID
    res.status(200).json(payment); // Respond with the found payment
  } catch (error) {
    res.status(404).json({ message: 'Payment not found', error: error.message }); // Handle not found case
  }
});

// Export the router
module.exports = router; 
