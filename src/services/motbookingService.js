const Mot = require('../modules/motbookingModel'); // Import the Mot model

// Create a new MOT entry
const createMot = async (motData) => {
  const mot = new Mot(motData); // Create a new MOT instance
  await mot.save(); // Save the MOT to the database
  return mot; // Return the created MOT entry
};

// Get a single MOT entry by ID
const getMot = async (motId) => {
  const mot = await Mot.findById(motId); // Fetch the MOT entry by ID
  return mot; // Return the MOT entry
};

// Get all MOT entries with optional filtering and sorting
const getMots = async (filter = {}, sort = {}) => {
  const mots = await Mot.find(filter).sort(sort); // Fetch MOT entries with filter and sort options
  return mots; // Return the list of MOT entries
};

// Update an MOT entry's information
const updateMot = async (motId, updateData) => {
  const updatedMot = await Mot.findByIdAndUpdate(motId, updateData, { new: true }); // Update the MOT entry
  return updatedMot; // Return the updated MOT entry
};

// Delete an MOT entry by ID
const deleteMot = async (motId) => {
  await Mot.findByIdAndDelete(motId); // Delete the MOT entry from the database
  return { message: 'MOT entry deleted successfully' }; // Return a success message
};

// Export all the functions for use in other modules
module.exports = {
  createMot,
  getMot,
  getMots,
  updateMot,
  deleteMot,
};
