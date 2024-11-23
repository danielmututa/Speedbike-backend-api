const express = require('express');
const router = express.Router();
const bikeController = require('../controllers/bikeController');
const multer = require('multer');

// Configure multer for image uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  })
});

// Search route (should come before /:id to avoid conflict)
router.get('/search', bikeController.searchBikes);

// GET all bikes available for purchase
router.get('/available', bikeController.getBikesForPurchase);

// GET all bikes for a specific user
router.get('/user/:userId', bikeController.getBikes);

// GET a bike by ID
router.get('/:id', bikeController.getBike);

// POST create a new bike with image
router.post('/', upload.single('image'), bikeController.createBike);

// PUT update bike info with image
router.put('/:id', upload.single('image'), bikeController.updateBike);

// DELETE a bike by ID (this will also delete associated image)
router.delete('/:id', bikeController.deleteBike);

module.exports = router;