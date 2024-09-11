const express = require('express');
const router = express.Router();
const BookingController = require('../Controllers/BookingController');

// Routes for Booking operations
router.post('/Booking', BookingController.createBooking);       // Create a new booking
router.get('/Booking', BookingController.getAllBookings);       // Get all bookings
router.get('/Booking:id', BookingController.getBookingById);    // Get a specific booking by ID
router.put('/Booking:id', BookingController.updateBooking);     // Update a booking by ID
router.delete('/Booking:id', BookingController.deleteBooking);  // Delete a booking by ID

module.exports = router;
