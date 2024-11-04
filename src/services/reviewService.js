const Review = require('../modules/reviewModel'); // Adjust the path as necessary

// Create a new review
const createReview = async (reviewData) => {
  try {
    const review = new Review(reviewData); // Create a new review instance
    await review.save(); // Save the review to the database
    return review; // Return the created review
  } catch (error) {
    throw new Error('Failed to create review: ' + error.message); // Handle errors
  }
};

// Fetch all reviews made for a specific bike
const getReviewsForBikes = async (bikeId) => {
  try {
    const reviews = await Review.find({ bikeId }); // Fetch reviews by bike ID
    return reviews; // Return the list of reviews
  } catch (error) {
    throw new Error('Failed to fetch reviews: ' + error.message); // Handle errors
  }
};

// Export the functions for use in other modules
module.exports = {
  createReview,
  getReviewsForBikes, // Export the function to fetch reviews for bikes
};
