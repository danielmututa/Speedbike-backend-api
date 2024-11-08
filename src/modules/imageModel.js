// imageModel.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

const ImageModel = mongoose.model('Image', imageSchema);

module.exports = ImageModel;


