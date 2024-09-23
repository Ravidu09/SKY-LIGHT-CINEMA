import React, { useState } from 'react';
import { Container, Typography, Button, Grid, TextField, MenuItem, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const showTimes = ['10:30', '13:30', '16:30']; // Define available show times

const Booking = () => {
  const { id: movieId } = useParams(); // Get the movieId from the URL
  const [date, setDate] = useState('');
  const [showTime, setShowTime] = useState('');
  const [seat, setSeat] = useState('');
  const [count, setCount] = useState(1); // Number of tickets
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleBooking = async () => {
    const bookingData = {
      BookingId: `BKG-${Math.floor(Math.random() * 10000)}`, // Generate random BookingId
      TicketId: `TID-${Math.floor(Math.random() * 10000)}`, // Generate random TicketId
      count,
      movieId,
      userId: 'someUserId', // You can replace this with authState user ID
      showTimeId: showTime,
      date,
      seat
    };

    try {
      await axios.post('http://localhost:4001/bookings', bookingData);
      setSnackbarMessage('Booking Successful!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error during booking:', error);
      setSnackbarMessage('Booking Failed! Please try again.');
      setSnackbarOpen(true);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Movie Booking
      </Typography>
      <Grid container spacing={3}>
        {/* Movie Date Selection */}
        <Grid item xs={12}>
          <TextField
            label="Select Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Grid>

        {/* Show Time Selection */}
        <Grid item xs={12}>
          <TextField
            select
            label="Select Show Time"
            fullWidth
            value={showTime}
            onChange={(e) => setShowTime(e.target.value)}
            required
          >
            <MenuItem value="" disabled>
              Select Show Time
            </MenuItem>
            {showTimes.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Seat Selection */}
        <Grid item xs={12}>
          <TextField
            label="Seat Number"
            fullWidth
            value={seat}
            onChange={(e) => setSeat(e.target.value)}
            required
          />
        </Grid>

        {/* Number of Tickets */}
        <Grid item xs={12}>
          <TextField
            label="Number of Tickets"
            type="number"
            fullWidth
            value={count}
            onChange={(e) => setCount(e.target.value)}
            required
          />
        </Grid>

        {/* Booking Button */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleBooking}>
            Confirm Booking
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar for Booking Confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Booking;
