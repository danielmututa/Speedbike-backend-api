const motService = require('../services/motbookingService'); // Adjust the path as necessary

// Create a new MOT entry
const createMot = async (req, res) => {
  try {
    const motData = req.body; // Extract data from the request body
    const newMot = await motService.createMot(motData);
    res.status(201).json(newMot); // Respond with the created MOT entry
  } catch (error) {
    res.status(500).json({ message: 'Error creating MOT entry', error: error.message });
  }
};

// Get a single MOT entry by ID
const getMot = async (req, res) => {
  try {
    const motId = req.params.id; // Extract the MOT ID from the request parameters
    const mot = await motService.getMot(motId);
    if (mot) {
      res.status(200).json(mot); // Respond with the MOT entry if found
    } else {
      res.status(404).json({ message: 'MOT entry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching MOT entry', error: error.message });
  }
};

// Get all MOT entries with optional filtering and sorting
const getMots = async (req, res) => {
  try {
    const filter = req.query; // Optional filtering can be passed as query parameters
    const mots = await motService.getMots(filter);
    res.status(200).json(mots); // Respond with the list of MOT entries
  } catch (error) {
    res.status(500).json({ message: 'Error fetching MOT entries', error: error.message });
  }
};

// Update an MOT entry's information
const updateMot = async (req, res) => {
  try {
    const motId = req.params.id; // Extract the MOT ID from the request parameters
    const updateData = req.body; // Extract data from the request body
    const updatedMot = await motService.updateMot(motId, updateData);
    if (updatedMot) {
      res.status(200).json(updatedMot); // Respond with the updated MOT entry
    } else {
      res.status(404).json({ message: 'MOT entry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating MOT entry', error: error.message });
  }
};

// Delete an MOT entry by ID
const deleteMot = async (req, res) => {
  try {
    const motId = req.params.id; // Extract the MOT ID from the request parameters
    await motService.deleteMot(motId);
    res.status(200).json({ message: 'MOT entry deleted successfully' }); // Respond with a success message
  } catch (error) {
    res.status(500).json({ message: 'Error deleting MOT entry', error: error.message });
  }
};

// Export all the functions for use in other modules
module.exports = {
  createMot,
  getMot,
  getMots,
  updateMot,
  deleteMot,
};
