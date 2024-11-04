
// controllers/bookingController.js
const bookingService = require('../services/bookingService');

const createBikeBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const newBooking = await bookingService.createBikeBooking(bookingData);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating bike booking', error });
  }
};

const getBikeBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await bookingService.getBikeBooking(bookingId);
    if (booking) {
      res.status(200).json(booking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error });
  }
};

const getBikeBookings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await bookingService.getBikeBookings(userId);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

const updateBikeBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updateData = req.body;
    const updatedBooking = await bookingService.updateBikeBooking(bookingId, updateData);
    if (updatedBooking) {
      res.status(200).json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error });
  }
};

const cancelBikeBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const cancelledBooking = await bookingService.cancelBikeBooking(bookingId);
    if (cancelledBooking) {
      res.status(200).json(cancelledBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error });
  }
};

const deleteBikeBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await bookingService.deleteBikeBooking(bookingId);
    if (deletedBooking) {
      res.status(200).json({ message: 'Booking deleted successfully', booking: deletedBooking });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error });
  }
};

module.exports = {
  createBikeBooking,
  getBikeBooking,
  getBikeBookings,
  updateBikeBooking,
  cancelBikeBooking,
  deleteBikeBooking,
};
