const Review = require('../modules/reviewModel');

const createReview = async (reviewData) => {
  try {
    console.log('Creating review with data:', reviewData); // Debug log
    const review = new Review(reviewData);
    await review.save();
    return review;
  } catch (error) {
    console.error('Error in createReview service:', error); // Debug log
    throw new Error('Failed to create review: ' + error.message);
  }
};

const getReviewsForBikes = async (bikeId) => {
  try {
    console.log('Fetching reviews for bikeId:', bikeId); // Debug log
    const reviews = await Review.find({ bikeId }).sort({ createdAt: -1 });
    console.log('Found reviews:', reviews); // Debug log
    return reviews;
  } catch (error) {
    console.error('Error in getReviewsForBikes service:', error); // Debug log
    throw new Error('Failed to fetch reviews: ' + error.message);
  }
};

// In your review service
const addReplyToReview = async (reviewId, ownerResponse) => {
  const review = await Review.findByIdAndUpdate(
    reviewId,
    { ownerResponse },
    { new: true }
  );
  return review;
};

module.exports = {
  createReview,
  getReviewsForBikes,
  addReplyToReview
};