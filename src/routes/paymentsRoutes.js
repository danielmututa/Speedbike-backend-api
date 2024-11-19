const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController'); // Adjust the path as necessary

// Define routes for payments

// Create a new payment
// This route will handle POST requests to create a payment
router.post('/', paymentController.createPayment); 

// Get a single payment by ID
// This route will handle GET requests for fetching a specific payment by ID
router.get('/:id', paymentController.getPayment); 

// Get all payments
// This route will handle GET requests to fetch all payments
router.get('/', paymentController.getAllPayments);

// Export the router so it can be used in the main app file
module.exports = router;
