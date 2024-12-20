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

const eventImageModel = mongoose.model('Image', imageSchema);

module.exports = eventImageModel;


