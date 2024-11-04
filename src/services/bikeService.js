const Bike = require('../modules/bikeModel'); // Import the Bike model 

// Create a new bike
const createBike = async (bikeData) => {
  const bike = new Bike(bikeData); // Create a new bike instance
  await bike.save(); // Save the bike to the database
  return bike; // Return the created bike
};

// Get a single bike using an ID
const getBike = async (bikeId) => {
  const bike = await Bike.findById(bikeId); // Fetch the bike by ID
  return bike; // Return the bike
};

// Get all bikes for a user with optional search/filter criteria
const getBikes = async (userId, filter = {}) => {
  const query = { userId, ...filter }; // Construct the query with userId and filters
  const bikes = await Bike.find(query); // Fetch bikes for the user
  return bikes; // Return the list of bikes
};

// Get all bikes available for purchase
const getBikesForPurchase = async () => {
  const bikes = await Bike.find(); // Fetch all bikes available for purchase
  return bikes; // Return the list of bikes
};

// Update bike info
const updateBike = async (bikeId, updateData) => {
  const updatedBike = await Bike.findByIdAndUpdate(bikeId, updateData, { new: true }); // Update the bike info
  return updatedBike; // Return the updated bike
};

// Delete a bike from the database
const deleteBike = async (bikeId) => {
  await Bike.findByIdAndDelete(bikeId); // Delete the bike from the database
  return { message: 'Bike deleted successfully' }; // Return a success message
};

// Export all the functions for use in other modules
module.exports = {
  createBike,
  getBike,
  getBikes,
  getBikesForPurchase, // Updated function name
  updateBike,
  deleteBike,
};
