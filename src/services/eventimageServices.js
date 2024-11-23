// const eventImageModel = require('../modules/eventimageModel');

// const uploadImage = async (imageData) => {
//   const { name, buffer, contentType } = imageData;

//   const newImage = new eventImageModel({
//     name,
//     img: {
//       data: buffer,
//       contentType,
//     },
//   });

//   await newImage.save();
//   return newImage;
// };

// module.exports = {
//   uploadImage,
// };


const eventImageModel = require('../modules/eventimageModel');

// Service to upload an image
const uploadImage = async (imageData) => {
  const { name, buffer, contentType } = imageData;

  const newImage = new eventImageModel({
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
const getImageById = async (imageId) => {
  return await eventImageModel.findById(imageId);
};

// Service to get all images
const getAllImages = async () => {
  return await eventImageModel.find();
};

// Service to delete an image by ID
const deleteImage = async (imageId) => {
  return await eventImageModel.findByIdAndDelete(imageId);
};

module.exports = {
  uploadImage,
  getImageById,
  getAllImages,
  deleteImage,
};
