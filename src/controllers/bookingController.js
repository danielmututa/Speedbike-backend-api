
// controllers/bookingController.js
const bookingService = require('../services/bookingService');

const createBikeBooking = async (req, res) => {
    try {
      console.log('Received booking request:', req.body); // Add this line
      const bookingData = req.body;
      const newBooking = await bookingService.createBikeBooking(bookingData);
      res.status(201).json(newBooking);
    } catch (error) {
      console.error('Booking creation error:', error); // Add this line
      res.status(500).json({ message: 'Error creating bike booking', error: error.message });
    }
  };


  const getAllBikeBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllBikeBookings();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
};



    
    


// in bookingController.js
const getBikeBooking = async (req, res) => {
  try {
      const bookingId = req.params.id;
      const booking = await BikeBooking.findById(bookingId)
          .populate('userId', 'email firstName lastName phone')  // Specify fields to populate
          .exec();
          
      if (booking) {
          res.status(200).json(booking);
      } else {
          res.status(404).json({ message: 'Booking not found' });
      }
  } catch (error) {
      console.error('Error fetching booking:', error);
      res.status(500).json({ 
          message: 'Error fetching booking', 
          error: error.message 
      });
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

// const updateBikeBooking = async (req, res) => {
//     try {
//       const bookingId = req.params.id;
//       const updateData = req.body;
//       const { matchedCount } = await bookingService.updateBikeBooking(bookingId, updateData);
//       if (matchedCount > 0) {
//         const updatedBooking = await bookingService.getBikeBooking(bookingId);
//         res.status(200).json(updatedBooking);
//       } else {
//         res.status(404).json({ message: 'Booking not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Error updating booking', error: error.message });
//     }
//   };




const updateBikeBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updateData = req.body;

    // Attempt to update the booking
    const updatedBooking = await bookingService.updateBikeBooking(bookingId, updateData);
    
    if (updatedBooking) {
      res.status(200).json(updatedBooking); // Return the updated booking
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
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
  getAllBikeBookings,
  createBikeBooking,
  getBikeBooking,
  getBikeBookings,
  updateBikeBooking,
  cancelBikeBooking,
  deleteBikeBooking,
};
