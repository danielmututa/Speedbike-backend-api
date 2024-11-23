// // imageRoutes.js
// const express = require('express');
// const router = express.Router();
// const imageController = require('../controllers/imageController');
// const multer = require('multer');

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'events/'); // Adjust the path if needed
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   }),
// });

// router.post('/', upload.single('testImage'), imageController.uploadImage);

// module.exports = router;

const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const multer = require('multer');   

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'events/');  // Path where files are stored
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);  // Save with original name
    },
  }),
});

// Route to upload an image
router.post('/', upload.single('testImage'), imageController.uploadImage);

// Route to get an image by ID
router.get('/:id', imageController.getImage);

// Route to get all images
router.get('/', imageController.getAllImages);  // Added route to get all images

// Route to delete an image by ID
router.delete('/:id', imageController.deleteImage);

module.exports = router;

