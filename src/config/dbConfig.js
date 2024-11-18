// // config/dbConfig.js
// require('dotenv').config();

// const dbConfig = {
//     uri: process.env.MONGO_URI,
//     options: {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }
// };

// module.exports = dbConfig;



require('dotenv').config();

const dbConfig = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/speedbikes' // Fallback to localhost if MONGO_URI is not defined
};

module.exports = dbConfig;

