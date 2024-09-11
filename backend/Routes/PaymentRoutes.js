const express = require('express');
const router = express.Router();
const PaymentController = require('../Controllers/PaymentController');

// Routes for Payment operations
router.post('/Payment', PaymentController.createPayment);       // Create a new payment
router.get('/Payment', PaymentController.getAllPayments);       // Get all payments
router.get('/Payment:id', PaymentController.getPaymentById);    // Get a specific payment by ID
router.put('/Payment:id', PaymentController.updatePayment);     // Update a payment by ID
router.delete('/Payment:id', PaymentController.deletePayment);  // Delete a payment by ID

module.exports = router;
