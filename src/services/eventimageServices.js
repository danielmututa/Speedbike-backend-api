const eventImageModel = require('../modules/eventimageModel');

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

module.exports = {
  uploadImage,
};