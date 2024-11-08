// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController'); // Adjust the path as necessary

// POST create a new bike booking
router.post('/', bookingController.createBikeBooking);

// GET a bike booking by ID
router.get('/:id', bookingController.getBikeBooking);

// GET All bike bookings
router.get('/', bookingController.getAllBikeBookings);


// GET all bike bookings for a specific user
router.get('/user/:userId', bookingController.getBikeBookings);

// PUT update an existing bike booking
router.put('/:id', bookingController.updateBikeBooking);

// PATCH cancel a bike booking
router.patch('/:id/cancel', bookingController.cancelBikeBooking);

// DELETE a bike booking by ID
router.delete('/:id', bookingController.deleteBikeBooking);

// Export the router
module.exports = router;
