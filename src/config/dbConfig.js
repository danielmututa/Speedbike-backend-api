// config/dbConfig.js
require('dotenv').config();

const dbConfig = {
    uri: process.env.MONGO_URI,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
};

module.exports = dbConfig;