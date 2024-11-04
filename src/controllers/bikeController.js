const BikeService = require('../services/bikeService'); // Adjust the path as necessary

// Handler for creating a bike
const createBike = async (req, res) => {
  try {
    const bikeData = req.body; // Get data from the request body
    const newBike = await BikeService.createBike(bikeData); // Call the service to create a bike
    res.status(201).json(newBike); // Respond with the created bike and a 201 status
  } catch (error) {
    res.status(500).json({ message: 'Failed to create bike: ' + error.message }); // Handle errors
  }
};

// Handler for fetching a bike by ID
const getBike = async (req, res) => {
  try {
    const bikeId = req.params.id; // Get bike ID from the request parameters
    const bike = await BikeService.getBike(bikeId); // Call the service to fetch the bike
    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' }); // Handle not found case
    }
    res.status(200).json(bike); // Respond with the bike
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bike: ' + error.message }); // Handle errors
  }
};

// Handler for fetching all bikes for a user
const getBikes = async (req, res) => {
  try {
    const userId = req.params.userId; // Get user ID from the request parameters
    const bikes = await BikeService.getBikes(userId); // Call the service to fetch bikes
    res.status(200).json(bikes); // Respond with the list of bikes
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bikes: ' + error.message }); // Handle errors
  }
};

// Handler for fetching all bikes available for purchase
const getBikesForPurchase = async (req, res) => {
  try {
    const bikes = await BikeService.getBikesForPurchase(); // Call the service to fetch all bikes
    res.status(200).json(bikes); // Respond with the list of bikes for purchase
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bikes for purchase: ' + error.message }); // Handle errors
  }
};

// Handler for updating bike info
const updateBike = async (req, res) => {
  try {
    const bikeId = req.params.id; // Get bike ID from the request parameters
    const updateData = req.body; // Get update data from the request body
    const updatedBike = await BikeService.updateBike(bikeId, updateData); // Call the service to update the bike
    res.status(200).json(updatedBike); // Respond with the updated bike
  } catch (error) {
    res.status(500).json({ message: 'Failed to update bike: ' + error.message }); // Handle errors
  }
};

// Handler for deleting a bike
const deleteBike = async (req, res) => {
  try {
    const bikeId = req.params.id; // Get bike ID from the request parameters
    await BikeService.deleteBike(bikeId); // Call the service to delete the bike
    res.status(200).json({ message: 'Bike deleted successfully' }); // Respond with success message
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete bike: ' + error.message }); // Handle errors
  }
};

// Export all the controller functions
module.exports = {
  createBike,
  getBike,
  getBikes,
  getBikesForPurchase,
  updateBike,
  deleteBike,
};
