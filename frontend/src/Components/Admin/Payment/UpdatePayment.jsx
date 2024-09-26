import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, CircularProgress, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/payments";

function UpdatePayment() {
  const { id } = useParams(); // Get the payment ID from the URL
  const [payment, setPayment] = useState({
    amount: '',
    method: '',
    status: 'pending', // Default to 'pending'
    transactionDate: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        console.log('Fetched Payment:', response.data); // Check the data
        setPayment(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment:", error);
        setError('Error fetching payment data');
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      console.log('Update Payload:', payment); // Check the payload
      await axios.put(`${URL}/${id}`, payment);
      alert('Payment updated successfully');
      navigate('/admindashboard/payment-management'); // Redirect to the payment management page
    } catch (error) {
      console.error("Error updating payment:", error);
      alert('Error updating payment');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>Update Payment</Typography>
      <TextField
        label="Amount"
        name="amount"
        type="number"
        value={payment.amount}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Payment Method</InputLabel>
        <Select
          name="method"
          value={payment.method}
          onChange={handleChange}
          label="Payment Method"
        >
          <MenuItem value="credit_card">Credit Card</MenuItem>
          <MenuItem value="paypal">PayPal</MenuItem>
          <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={payment.status}
          onChange={handleChange}
          label="Status"
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="failed">Failed</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Transaction Date"
        name="transactionDate"
        type="datetime-local"
        value={payment.transactionDate ? payment.transactionDate.substring(0, 16) : ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        sx={{ marginTop: 2 }}
      >
        Update
      </Button>
    </Box>
  );
}

export default UpdatePayment;
