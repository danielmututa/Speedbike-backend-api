const BikeBooking = require('../modules/bookingModel'); // Import the BikeBooking model

// Create a new bike booking
const createBikeBooking = async (bookingData) => {
  const booking = new BikeBooking(bookingData); // Create a new booking instance
  await booking.save(); // Save the booking to the database
  return booking; // Return the created booking
};

// Update an existing bike booking
const updateBikeBooking = async (bookingId, updateData) => {
  const updatedBooking = await BikeBooking.findByIdAndUpdate(bookingId, updateData, { new: true }); // Update and return the booking
  return updatedBooking;
};

// Get a single bike booking by ID
const getBikeBooking = async (bookingId) => {
  const booking = await BikeBooking.findById(bookingId).populate('userId'); // Fetch booking by ID and populate user info
  return booking;
};

// Get all bike bookings for a specific user, with optional filters
const getBikeBookings = async (userId, filter = {}) => {
  const query = { userId, ...filter }; // Construct query with userId and additional filters
  const bookings = await BikeBooking.find(query).populate('userId'); // Fetch all bookings for the user
  return bookings;
};

// Cancel a bike booking
const cancelBikeBooking = async (bookingId) => {
  const cancelledBooking = await BikeBooking.findByIdAndUpdate(bookingId, { status: 'Cancelled' }, { new: true }); // Update booking status to 'Cancelled'
  return cancelledBooking;
};

// Delete a bike booking
const deleteBikeBooking = async (bookingId) => {
  await BikeBooking.findByIdAndDelete(bookingId); // Delete the booking from the database
  return { message: 'Booking deleted successfully' }; // Return a success message
};

// Export all the functions for use in other modules
module.exports = {
  createBikeBooking,
  updateBikeBooking,
  getBikeBooking,
  getBikeBookings,
  cancelBikeBooking,
  deleteBikeBooking
};
