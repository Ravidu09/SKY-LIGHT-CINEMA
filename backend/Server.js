const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

// Import routes
const userRoutes = require('./Routes/UserRoutes');
const MoviesRoutes = require('./Routes/MoviesRoutes');
const bookingRoutes = require('./Routes/BookingRoutes');
const feedbackRoutes = require('./Routes/FeedbackRoutes');
const maintananceRoutes = require('./Routes/MaintananceRoutes');
const paymentRoutes = require('./Routes/PaymentRoutes');
const promotionRoutes = require('./Routes/PromotionRoutes');
const staffRoutes = require('./Routes/StaffRoutes');

// Middleware
app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/movies', MoviesRoutes);
app.use('/bookings', bookingRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/maintanance', maintananceRoutes);
app.use('/payments', paymentRoutes);
app.use('/promotions', promotionRoutes);
app.use('/staff', staffRoutes);

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = 4000;
const DB_URL = 'mongodb+srv://TBMS:TBMS@tbms.sac1w.mongodb.net/';

// Connect to MongoDB
mongoose.connect(DB_URL)
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => console.log('DB connection error', err));

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}!`);
});
