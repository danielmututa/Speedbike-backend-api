const express = require('express');
const router = express.Router();
const bikeController = require('../controllers/bikeController');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../src/uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});


  

// Configure multer upload
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only .jpeg, .png, .gif and .jpg format allowed!'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max file size
    }
});



// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}




// Search route (should come before /:id to avoid conflict)
router.get('/search', bikeController.searchBikes);

// GET all bikes available for purchase
router.get('/available',upload.single('image'), bikeController.getBikesForPurchase);

// GET all bikes for a specific user
router.get('/user/:userId', bikeController.getBikes);

// GET a bike by ID
router.get('/:id', bikeController.getBike);

// POST create a new bike with image
router.post('/', upload.single('image'), bikeController.createBike);

// PUT update bike info with image
router.put('/:id', upload.single('image'), bikeController.updateBike);

// DELETE a bike by ID
router.delete('/:id', bikeController.deleteBike);

// Error handling middleware
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).json({
            message: "File upload error: " + error.message
        });
    }
    next(error);
});


module.exports = router;
