const express = require('express');
const router = express.Router();
const bikeController = require('../controllers/bikeController'); // Adjust the path as necessary

// GET all bikes available for purchase
router.get('/available', bikeController.getBikesForPurchase);

// GET a bike by ID
router.get('/:id', bikeController.getBike);

// POST create a new bike
router.post('/', bikeController.createBike);

// PUT update bike info
router.put('/:id', bikeController.updateBike);

// DELETE a bike by ID
router.delete('/:id', bikeController.deleteBike);

// GET all bikes for a specific user (optional, if you need it)
router.get('/user/:userId', bikeController.getBikes);

module.exports = router;
