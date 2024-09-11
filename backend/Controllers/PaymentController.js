const Payment = require('../Model/PaymentModel');

// Generate payment ID with leading zeros
const generatePaymentID = async () => {
    const lastPayment = await Payment.findOne().sort({ paymentID: -1 }).limit(1);
    const lastId = lastPayment ? parseInt(lastPayment.paymentID.replace('P', ''), 10) : 0;
    const newId = `P${(lastId + 1).toString().padStart(3, '0')}`; // Adjust padding as needed
    return newId;
};

// Create a new payment record
exports.createPayment = async (req, res) => {
    try {
        const { bookingID, amount, paymentMethod, date } = req.body;

        const paymentID = await generatePaymentID(); // Generate new payment ID
        const newPayment = new Payment({ paymentID, bookingID, amount, paymentMethod, date });
        await newPayment.save();

        res.status(201).json({ message: 'Payment record created successfully', payment: newPayment });
    } catch (error) {
        res.status(500).json({ message: 'Error creating payment record', error: error.message });
    }
};

// Get all payment records
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving payment records', error: error.message });
    }
};

// Get a payment record by ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment record not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving payment record', error: error.message });
    }
};

// Update a payment record by ID
exports.updatePayment = async (req, res) => {
    try {
        const { bookingID, amount, paymentMethod, date } = req.body;

        const updatedPayment = await Payment.findByIdAndUpdate(
            req.params.id,
            { bookingID, amount, paymentMethod, date },
            { new: true } // Return the updated payment record
        );

        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment record not found' });
        }

        res.status(200).json({ message: 'Payment record updated successfully', payment: updatedPayment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating payment record', error: error.message });
    }
};

// Delete a payment record by ID
exports.deletePayment = async (req, res) => {
    try {
        const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
        if (!deletedPayment) {
            return res.status(404).json({ message: 'Payment record not found' });
        }

        res.status(200).json({ message: 'Payment record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting payment record', error: error.message });
    }
};
