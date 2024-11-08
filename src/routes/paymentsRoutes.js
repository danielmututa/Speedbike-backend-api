const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController'); // Adjust the path as necessary

// Define routes for payments
// Create a new payment
router.post('/', paymentController.createPayment); 

// Get a single payment by ID
router.get('/:id', paymentController.getPayment); 


// Get all payments
router.get('/', paymentController.getAllPayments);

// Get single payment by ID
router.get('/:id', paymentController.getPayment);

// Export the router
module.exports = router;
