// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewService = require('../services/reviewService'); // Adjust the path based on your directory structure

// POST create a new review
router.post('/', async (req, res) => {
  try {
    const reviewData = req.body; // Get data from the request body
    const newReview = await reviewService.createReview(reviewData); // Call the service to create a new review
    res.status(201).json(newReview); // Respond with the created review
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error: error.message }); // Handle errors
  }
});

// GET all reviews for a specific bike
router.get('/bike/:bikeId', async (req, res) => {
  try {
    const bikeId = req.params.bikeId; // Get the bike ID from the URL parameters
    const reviews = await reviewService.getReviewsForBikes(bikeId); // Fetch reviews for the bike
    res.status(200).json(reviews); // Respond with the list of reviews
  } catch (error) {
    res.status(404).json({ message: 'Reviews not found', error: error.message }); // Handle not found case
  }
});

// Export the router
module.exports = router; 
