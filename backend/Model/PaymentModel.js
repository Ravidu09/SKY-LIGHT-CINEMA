const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  paymentId: { type: String, required: true, unique: true }, // Unique ID for the payment
  amount: { type: Number, required: true }, // Total amount paid
  method: { type: String, required: true }, // Payment method (e.g., credit card, PayPal)
  status: { type: String, required: true }, // Payment status (e.g., pending, completed, failed)
  transactionDate: { type: Date, default: Date.now }// Date of the transaction
});

module.exports = mongoose.model('Payment', PaymentSchema);
