// config/corsConfig.js
const corsConfig = {
    origin: [
        'http://localhost:5000',
        'http://localhost:3000',
        'https://speedbike.kygcq.mongodb.net'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

module.exports = corsConfig;