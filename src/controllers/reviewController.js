const reviewService = require('../services/reviewService'); // Adjust the path as necessary

// Create a new review
const createReview = async (req, res) => {
  try {
    const reviewData = req.body; // Extract review data from the request body
    const newReview = await reviewService.createReview(reviewData); // Call the service to create a review
    res.status(201).json(newReview); // Respond with the created review
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error: error.message }); // Handle errors
  }
};

// Fetch all reviews made for a specific bike
const getReviewsForBikes = async (req, res) => {
  try {
    const bikeId = req.params.id; // Extract bike ID from the request parameters
    const reviews = await reviewService.getReviewsForBikes(bikeId); // Call the service to fetch reviews
    res.status(200).json(reviews); // Respond with the list of reviews
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message }); // Handle errors
  }
};

// Export the functions for use in other modules
module.exports = {
  createReview,
  getReviewsForBikes,
};
