const Payment = require('../Model/PaymentModel'); // Assuming you have a Payment model defined
const mongoose = require('mongoose');

// Create a new payment
exports.createPayment = async (req, res) => {
    try {
        const { amount, method, status, transactionDate } = req.body;

        const newPayment = new Payment({
            amount,
            method,
            status,
            transactionDate,
            userId: req.user.userId, // Assuming you're linking payment to a user
        });

        await newPayment.save();
        res.status(201).json({ message: 'Payment created successfully', payment: newPayment });
    } catch (error) {
        res.status(500).json({ message: 'Error creating payment', error: error.message });
    }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('userId', '-password'); // Assuming you're populating user details
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving payments', error: error.message });
    }
};

// Get a single payment by ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('userId', '-password');
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving payment', error: error.message });
    }
};

// Update a payment by ID
exports.updatePayment = async (req, res) => {
    try {
        const { amount, method, status, transactionDate } = req.body;
        const updateData = { amount, method, status, transactionDate };

        const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({ message: 'Payment updated successfully', payment: updatedPayment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating payment', error: error.message });
    }
};

// Delete a payment by ID
exports.deletePayment = async (req, res) => {
    try {
        const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
        if (!deletedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting payment', error: error.message });
    }
};
