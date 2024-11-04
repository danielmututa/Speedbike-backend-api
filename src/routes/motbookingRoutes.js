// routes/motRoutes.js
const express = require('express');
const router = express.Router();
const motService = require('../services/motbookingService'); // Adjust the path based on your directory structure

// POST create a new MOT entry
router.post('/', async (req, res) => {
  try {
    const motData = req.body; // Get data from the request body
    const newMot = await motService.createMot(motData); // Call the service to create a new MOT entry
    res.status(201).json(newMot); // Respond with the created MOT entry
  } catch (error) {
    res.status(500).json({ message: 'Error creating MOT entry', error }); // Handle errors
  }
});

// GET a single MOT entry by ID
router.get('/:id', async (req, res) => {
  try {
    const motId = req.params.id; // Get the MOT ID from the URL parameters
    const mot = await motService.getMot(motId); // Fetch the MOT entry by ID
    if (mot) {
      res.status(200).json(mot); // Respond with the found MOT entry
    } else {
      res.status(404).json({ message: 'MOT entry not found' }); // Handle not found case
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching MOT entry', error }); // Handle errors
  }
});

// GET all MOT entries with optional filtering and sorting
router.get('/', async (req, res) => {
  try {
    const filter = req.query; // Get filtering options from query parameters
    const mots = await motService.getMots(filter); // Fetch all MOT entries with the given filter
    res.status(200).json(mots); // Respond with the list of MOT entries
  } catch (error) {
    res.status(500).json({ message: 'Error fetching MOT entries', error }); // Handle errors
  }
});

// PUT update an existing MOT entry
router.put('/:id', async (req, res) => {
  try {
    const motId = req.params.id; // Get the MOT ID from the URL parameters
    const updateData = req.body; // Get data from the request body
    const updatedMot = await motService.updateMot(motId, updateData); // Update the MOT entry
    if (updatedMot) {
      res.status(200).json(updatedMot); // Respond with the updated MOT entry
    } else {
      res.status(404).json({ message: 'MOT entry not found' }); // Handle not found case
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating MOT entry', error }); // Handle errors
  }
});

// DELETE an MOT entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const motId = req.params.id; // Get the MOT ID from the URL parameters
    await motService.deleteMot(motId); // Delete the MOT entry
    res.status(200).json({ message: 'MOT entry deleted successfully' }); // Respond with success message
  } catch (error) {
    res.status(500).json({ message: 'Error deleting MOT entry', error }); // Handle errors
  }
});

module.exports = router; // Export the router
