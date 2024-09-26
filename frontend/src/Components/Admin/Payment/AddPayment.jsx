/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/payments"; // Ensure this matches your API endpoint

function AddPayment({ onBack }) {
  const [paymentId, setPaymentId] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('credit_card'); // Default payment method
  const [status, setStatus] = useState('completed'); // Default payment status
  const [transactionDate, setTransactionDate] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    // Validate required fields
    if (!paymentId || !amount || !method || !status || !transactionDate) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(URL, { paymentId, amount, method, status, transactionDate });
      if (response.status === 201) {
        // Notify user of successful addition
        alert('Payment added successfully');
        // Redirect to the PaymentManagement page
        navigate('/admindashboard/payment-management');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
      <Typography variant="h5" gutterBottom>
        Add New Payment
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Payment ID"
          variant="outlined"
          value={paymentId}
          onChange={(e) => setPaymentId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Amount"
          variant="outlined"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Payment Method</InputLabel>
          <Select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            label="Payment Method"
          >
            <MenuItem value="credit_card">Credit Card</MenuItem>
            <MenuItem value="paypal">PayPal</MenuItem>
            <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Payment Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Payment Status"
          >
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Transaction Date"
          variant="outlined"
          type="date"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }} // Ensures label is not floating
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Add Payment
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginTop: 2, marginLeft: 2 }}
          onClick={onBack}
        >
          Back
        </Button>
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </form>
    </Box>
  );
}

export default AddPayment;
