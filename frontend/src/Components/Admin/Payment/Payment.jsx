import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';

const URL = "http://localhost:4001/payments"; // Ensure this matches your API endpoint

function Payment() {
    const { paymentId } = useParams();
    const [payment, setPayment] = useState(null);

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                const response = await axios.get(`${URL}/${paymentId}`);
                setPayment(response.data);
            } catch (error) {
                console.error('Error fetching payment details:', error);
            }
        };

        fetchPayment();
    }, [paymentId]);

    if (!payment) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Payment Details
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h6">Payment ID: {payment.paymentId}</Typography>
                <Typography variant="h6">Amount: ${payment.amount.toFixed(2)}</Typography>
                <Typography variant="h6">Method: {payment.method}</Typography>
                <Typography variant="h6">Status: {payment.status}</Typography>
                <Typography variant="h6">Transaction Date: {new Date(payment.transactionDate).toLocaleString()}</Typography>
            </Paper>
        </Box>
    );
}

export default Payment;
