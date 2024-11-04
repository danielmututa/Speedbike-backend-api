const mongoose = require('mongoose');
const dbConfig = require('./src/config/dbConfig'); // Import the DB configuration

const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig.uri, dbConfig.options);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process if the connection fails
  }
};

module.exports = connectDB;
