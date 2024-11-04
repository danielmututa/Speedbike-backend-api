const express = require('express');
const router = express.Router();
const motController = require('../controllers/motbookingController'); // Adjust the path as necessary

// Define routes for MOT entries
 // Create a new MOT entry
router.post('/', motController.createMot);

// Get a single MOT entry by ID
router.get('/:id', motController.getMot);

// Get all MOT entries with optional filtering
router.get('/', motController.getMots); 

// Update an existing MOT entry
router.put('/:id', motController.updateMot); 

 // Delete an MOT entry by ID
router.delete('/:id', motController.deleteMot);

// Export the router
module.exports = router;
