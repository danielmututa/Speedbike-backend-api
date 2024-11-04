require('dotenv').config(); // Load environment variables from .env file

const dbConfig = {
  uri: process.env.DB_URI || 'mongodb+srv://mututadaniel54:PtHBTxh775vvOHmT@speedbike.kygcq.mongodb.net/Speedbikes?retryWrites=true&w=majority&appName=speedbike',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

module.exports = dbConfig; // Export the configuration

