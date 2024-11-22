const sf = require('sf');
const imageService = require('../services/imageServices');  // Ensure to require your image service

// Upload image
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { originalname, buffer, mimetype } = req.file;

    const newImage = await imageService.uploadImage({
      name: originalname,
      buffer,
      contentType: mimetype,
    });

    const successMessage = sf("Image '{0}' uploaded successfully!", originalname);
    res.status(201).json({ message: successMessage, image: newImage });
  } catch (error) {
    const errorMessage = sf("Error uploading image '{0}': {1}", req.file ? req.file.originalname : 'Unknown', error.message);
    res.status(500).json({ message: errorMessage });
  }
};

// Get image by ID
const getImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await imageService.getImage(imageId);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.contentType(image.img.contentType);  // Set response content type
    res.send(image.img.data);  // Send image data
  } catch (error) {
    const errorMessage = sf("Error retrieving image '{0}': {1}", req.params.id, error.message);
    res.status(500).json({ message: errorMessage });
  }
};

// Get all images
const getAllImages = async (req, res) => {
  try {
    const images = await imageService.getAllImages();

    if (!images || images.length === 0) {
      return res.status(404).json({ message: 'No images found' });
    }

    res.status(200).json({ images });
  } catch (error) {
    const errorMessage = sf("Error retrieving images: {0}", error.message);
    res.status(500).json({ message: errorMessage });
  }
};

// Delete image by ID
const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await imageService.deleteImage(imageId);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const successMessage = sf("Image '{0}' deleted successfully!", image.name);
    res.status(200).json({ message: successMessage });
  } catch (error) {
    const errorMessage = sf("Error deleting image '{0}': {1}", req.params.id, error.message);
    res.status(500).json({ message: errorMessage });
  }
};

module.exports = {
  uploadImage,
  getImage,
  getAllImages,
  deleteImage,
};
