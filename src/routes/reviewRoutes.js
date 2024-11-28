const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController'); // Adjust the path as necessary

// Define routes for reviews
 // Create a new review
router.post('/', reviewController.createReview);

// Get reviews for a specific bike by bike ID
router.get('/bikes/:id', reviewController.getReviewsForBikes); 


// In your routes file
router.post('/reviews/:reviewId/reply', reviewController.addReplyToReview);

// Export the router
module.exports = router;
