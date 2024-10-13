/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/bookings";

function UpdateBooking() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        BookingId: '',
        TicketId: '',
        count: '',
        movieId: '',
        userId: '',
        showTimeId: 'Select',
        date: '',
        seat: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${URL}/${id}`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error("Error fetching booking:", error.response ? error.response.data : error.message);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${URL}/${id}`, formData);
            navigate('/bookings');
        } catch (error) {
            console.error("Error updating booking:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Update Booking</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Booking ID"
                    name="BookingId"
                    variant="outlined"
                    fullWidth
                    value={formData.BookingId}
                    onChange={handleChange}
                    margin="normal"
                    disabled
                />
                <TextField
                    label="Ticket ID"
                    name="TicketId"
                    variant="outlined"
                    fullWidth
                    value={formData.TicketId}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="Count"
                    name="count"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={formData.count}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="Movie ID"
                    name="movieId"
                    variant="outlined"
                    fullWidth
                    value={formData.movieId}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="User ID"
                    name="userId"
                    variant="outlined"
                    fullWidth
                    value={formData.userId}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="Show Time"
                    name="showTimeId"
                    variant="outlined"
                    fullWidth
                    value={formData.showTimeId}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="Date"
                    name="date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={formData.date}
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Seat"
                    name="seat"
                    variant="outlined"
                    fullWidth
                    value={formData.seat}
                    onChange={handleChange}
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                >
                    Update Booking
                </Button>
            </form>
        </Box>
    );
}

export default UpdateBooking;
