const Review = require('../modules/reviewModel');

const createReview = async (reviewData) => {
  try {
    console.log('Creating review with data:', reviewData);
    const review = new Review(reviewData);
    await review.save();
    return review;
  } catch (error) {
    console.error('Error in createReview service:', error);
    throw new Error('Failed to create review: ' + error.message);
  }
};

const getReviewsForBikes = async () => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    console.log('Found reviews:', reviews);
    return reviews;
  } catch (error) {
    console.error('Error in getReviewsForBikes service:', error);
    throw new Error('Failed to fetch reviews: ' + error.message);
  }
};

const addReplyToReview = async (reviewId, ownerResponse) => {
  try {
    const review = await Review.findByIdAndUpdate(
      reviewId,
      { ownerResponse },
      { new: true }
    );
    if (!review) {
      throw new Error('Review not found');
    }
    return review;
  } catch (error) {
    console.error('Error in addReplyToReview service:', error);
    throw new Error('Failed to add reply: ' + error.message);
  }
};

module.exports = {
  createReview,
  getReviewsForBikes,
  addReplyToReview
};