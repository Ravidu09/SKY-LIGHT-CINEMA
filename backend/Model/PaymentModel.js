const mongoose = require('mongoose');

// Define the Payment Schema
const PaymentSchema = new mongoose.Schema({
    InvID: {
        type: String,
        required: true,
        unique: true
    },
    ItemName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    OrderID: {
        type: String, // Change to String if not using ObjectId
        required: true
    },
    Cost: {
        type: Number,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    Note: {
        type: String,
        required: false
    }
});

// Create the Payment model
const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
