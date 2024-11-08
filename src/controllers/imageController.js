// imageController.js
const sf = require('sf');
const ImageModel = require('../modules/imageModel'); // Adjust this path if necessary

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { originalname, buffer } = req.file;

    const newImage = new ImageModel({
      name: originalname,
      img: {
        data: buffer,
        contentType: 'image/png', // Adjust the content type as needed
      },
    });

    await newImage.save();

    const successMessage = sf("Image '{0}' uploaded successfully!", originalname);
    res.status(201).json({ message: successMessage, image: newImage });
  } catch (error) {
    const errorMessage = sf("Error uploading image '{0}': {1}", req.file ? req.file.originalname : 'Unknown', error.message);
    res.status(500).json({ message: errorMessage });
  }
};

module.exports = { uploadImage };
