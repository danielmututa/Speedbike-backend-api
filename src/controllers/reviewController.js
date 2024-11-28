const reviewService = require('../services/reviewService');

const createReview = async (req, res) => {
  try {
    console.log('Received review data:', req.body);
    const reviewData = req.body;

    // Validate required fields
    if (!reviewData.name || !reviewData.email || !reviewData.message || !reviewData.stars) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const newReview = await reviewService.createReview(reviewData);
    res.status(201).json({
      success: true,
      review: newReview
    });
  } catch (error) {
    console.error('Controller error creating review:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating review',
      error: error.message
    });
  }
};

const getReviewsForBikes = async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsForBikes();
    res.status(200).json({
      success: true,
      reviews: reviews
    });
  } catch (error) {
    console.error('Controller error fetching reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message
    });
  }
};

const addReplyToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { ownerResponse } = req.body;

    if (!ownerResponse) {
      return res.status(400).json({ message: 'Reply text is required' });
    }

    const updatedReview = await reviewService.addReplyToReview(reviewId, ownerResponse);
    
    res.status(200).json({
      success: true,
      review: updatedReview
    });
  } catch (error) {
    console.error('Controller error adding reply:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding reply',
      error: error.message
    });
  }
};

module.exports = {
  createReview,
  getReviewsForBikes,
  addReplyToReview
};