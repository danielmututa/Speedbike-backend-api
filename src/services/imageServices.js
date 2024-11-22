
const ImageModel = require('../modules/imageModel');  // Make sure the model is correctly required

// Service to upload an image
const uploadImage = async (imageData) => {
  const { name, buffer, contentType } = imageData;

  const newImage = new ImageModel({
    name,
    img: {
      data: buffer,
      contentType,
    },
  });

  await newImage.save();
  return newImage;
};

// Service to get an image by ID
const getImage = async (imageId) => {
  return await ImageModel.findById(imageId);
};

// Service to get all images
const getAllImages = async () => {
  return await ImageModel.find();  // Fetch all images from the database
};

// Service to delete an image by ID
const deleteImage = async (imageId) => {
  return await ImageModel.findByIdAndDelete(imageId);
};

module.exports = {
  uploadImage,
  getImage,
  getAllImages,
  deleteImage,
};
