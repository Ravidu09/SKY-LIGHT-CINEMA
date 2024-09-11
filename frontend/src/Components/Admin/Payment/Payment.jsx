/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';

const URL = "http://localhost:4000/Payment";

function Payment() {
  const { id } = useParams();
  const [Payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        setPayment(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Payment details:', error);
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!Payment) return <Typography>No Payment found.</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
      Payment Details
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h6">ID: {Payment.InvID}</Typography>
        <Typography variant="h6">Item Name: {Payment.ItemName}</Typography>
        <Typography variant="h6">Type: {Payment.type}</Typography>
        <Typography variant="h6">Order ID: {Payment.OrderID}</Typography>
        <Typography variant="h6">Cost: ${Payment.Cost}</Typography>
        <Typography variant="h6">Date: {new Date(Payment.Date).toLocaleDateString()}</Typography>
        <Typography variant="h6">Note: {Payment.Note || 'No Note'}</Typography>
      </Paper>
    </Box>
  );
}

export default Payment;
