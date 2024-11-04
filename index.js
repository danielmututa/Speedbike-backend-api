const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./connect.DB'); // Import the database connection function


// Import route files
const bikeRoutes = require('./src/routes/bikeRoutes');
const motbookingRoutes = require('./src/routes/motbookingRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const paymentRoutes = require('./src/routes/paymentsRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const errorMiddleware = require('./src/middleware/errorMiddleware');

dotenv.config(); // Initialize environment variables

const app = express();

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json()); // Middleware to parse JSON

// Connect to the database
connectDB();


//  ROUTES 
// Bike Routes
app.use('/api/bikes', bikeRoutes);

// Mot Routes
app.use('/api/motbookings', motbookingRoutes);

// Booking Route
app.use('/api/bookings', bookingRoutes);

// Payment Route
app.use('/api/payments', paymentRoutes);

// Review Route
app.use('/api/reviews', reviewRoutes);

// Event Route
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => { res.send('Hello World!'); });
// Error handling middleware
app.use(errorMiddleware);

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
