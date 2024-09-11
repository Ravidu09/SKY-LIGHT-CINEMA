const Booking = require('../Model/BookingModel');

// Generate booking ID with leading zeros
const generateBookingID = async () => {
    const lastBooking = await Booking.findOne().sort({ bookingID: -1 }).limit(1);
    const lastId = lastBooking ? parseInt(lastBooking.bookingID.replace('B', ''), 10) : 0;
    const newId = `B${(lastId + 1).toString().padStart(3, '0')}`; // Adjust padding as needed
    return newId;
};

// Create a new booking record
exports.createBooking = async (req, res) => {
    try {
        const { movieID, customerID, showTime, seats } = req.body;

        const bookingID = await generateBookingID(); // Generate new booking ID
        const newBooking = new Booking({ bookingID, movieID, customerID, showTime, seats });
        await newBooking.save();

        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

// Get all booking records
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error: error.message });
    }
};

// Get a booking record by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving booking', error: error.message });
    }
};

// Update a booking record by ID
exports.updateBooking = async (req, res) => {
    try {
        const { movieID, customerID, showTime, seats } = req.body;

        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { movieID, customerID, showTime, seats },
            { new: true } // Return the updated booking record
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error: error.message });
    }
};

// Delete a booking record by ID
exports.deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error: error.message });
    }
};
