const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./connect.DB'); // Import the database connection function
const cors = require('cors');
 const corsConfig = require('./src/config/corsConfig');
const serverConfig = require('./src/config/serverConfig');
// const multer = require('multer');
const path = require('path')



// Import route files
const bikeRoutes = require('./src/routes/bikeRoutes');
const motbookingRoutes = require('./src/routes/motbookingRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const paymentRoutes = require('./src/routes/paymentsRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const imageRoutes = require('./src/routes/imageRoutes')
const eventimageRoutes = require('./src/routes/eventimageRoutes')
const registerRoutes = require('./src/routes/registerRoute')

const uploadDir = path.join(process.cwd(), './uploads');
const errorMiddleware = require('./src/middleware/errorMiddleware');


dotenv.config(); // Initialize environment variables

const app = express();

app.use(cors());

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json()); // Middleware to parse JSON



// Error handling middleware
app.use(errorMiddleware);

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });


// Connect to the database
connectDB();



//  ROUTES 
app.use('/uploads', express.static(uploadDir));

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

// Route for image upload
app.use('/api/images', imageRoutes);

// Route for eventimage
app.use('/api/eventimage', eventimageRoutes);

app.use('/api/register', registerRoutes);

// const upload = multer({ storage });





// app.use('/api/bookings', bookingRoutes)






// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});                  
module.exports = app;
