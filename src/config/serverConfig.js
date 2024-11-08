// config/serverConfig.js
require('dotenv').config();

const serverConfig = {
    port: process.env.PORT || 5000
};

module.exports = serverConfig;