/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/Payment";

function UpdatePayment() {
  const { id } = useParams();
  const [Payment, setPayment] = useState({
    ItemName: '',
    type: '',
    OrderID: '',
    Cost: '',
    Date: '',
    Note: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        setPayment(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...Payment, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${URL}/${id}`, Payment);
      alert('Payment updated successfully');
      navigate('/admindashboard/Payment-management');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>Update Payment</Typography>
      <TextField
        label="Item Name"
        name="ItemName"
        value={Payment.ItemName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Type"
        name="type"
        value={Payment.type}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Order ID"
        name="OrderID"
        value={Payment.OrderID}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Cost"
        name="Cost"
        type="number"
        value={Payment.Cost}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Date"
        name="Date"
        type="date"
        value={Payment.Date}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Note"
        name="Note"
        value={Payment.Note}
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
        Update Payment
      </Button>
      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default UpdatePayment;
