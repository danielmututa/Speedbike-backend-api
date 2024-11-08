// imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Adjust the path if needed
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

router.post('/', upload.single('testImage'), imageController.uploadImage);

module.exports = router;













