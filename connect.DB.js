const mongoose = require('mongoose');
const dbConfig = require('./src/config/dbConfig'); // Import the DB configuration



// Modify your connectDB function
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };

module.exports = connectDB;
