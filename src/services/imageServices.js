const ImageModel = require('../modules/imageModel');

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

module.exports = {
  uploadImage,
};