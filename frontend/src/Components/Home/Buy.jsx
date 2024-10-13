/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Box, Grid, Typography, MenuItem, FormControl, InputLabel, Select, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

// Dummy data for movies and showtimes
const movies = [
  { id: 1, title: 'Planet of Apes' },
  { id: 2, title: 'The Garfield Movie' },
  { id: 3, title: 'Deadpool x Wolverine' },
  { id: 4, title: 'The Garfield Movie' },
];

const showtimes = [
  { id: 1, time: '12:00 PM' },
  { id: 2, time: '03:00 PM' },
  { id: 3, time: '06:00 PM' },
  { id: 4, time: '09:00 PM' },
];

// Generate 50 seats
const generateSeats = (num) => {
  const seats = [];
  for (let i = 1; i <= num; i++) {
    const row = String.fromCharCode(65 + Math.floor((i - 1) / 10)); // Row letters (A, B, C, ...)
    const seatNumber = (i % 10 === 0 ? 10 : i % 10).toString().padStart(2, '0'); // Seat numbers (01, 02, ..., 10)
    seats.push({ id: `${row}${seatNumber}`, status: 'available' });
  }
  return seats;
};

const seats = generateSeats(50);
const SEAT_PRICE = 750; // Price per seat

function Buy() {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [amount, setAmount] = useState(0); // Amount starts at 0
  const [method, setMethod] = useState('credit card'); // Default to 'credit card'
  const [status, setStatus] = useState('pending'); // Default to 'pending'
  const [transactionDate, setTransactionDate] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const URL = "http://localhost:4001/payment";

  const handleMovieChange = (e) => {
    setSelectedMovie(e.target.value);
  };

  const handleShowtimeChange = (e) => {
    setSelectedShowtime(e.target.value);
  };

  const handleSeatSelection = (seatId) => {
    setSelectedSeats((prevSeats) => {
      const updatedSeats = prevSeats.includes(seatId)
        ? prevSeats.filter(id => id !== seatId) // Remove seat if already selected
        : [...prevSeats, seatId]; // Add seat if not already selected

      // Update the amount based on selected seats
      setAmount(updatedSeats.length * SEAT_PRICE); // Update amount
      return updatedSeats; // Return updated selected seats
    });
  };


  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await axios.post(URL, {
        amount,
        method,
        status,
        transactionDate,
        seats: selectedSeats,
      });
      if (response.status === 201) {
        alert('Payment added successfully');
        navigate('/admindashboard/payment-management');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div>
      <Header />
      <Box sx={{ padding: 4, backgroundColor: '#1a1a1a', color: 'white' }}>
        <Typography variant="h4" align="center" color="red" gutterBottom>
          Buy Tickets
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="movie-label" sx={{ color: 'white' }}>Select Movie</InputLabel>
              <Select
                labelId="movie-label"
                value={selectedMovie}
                onChange={handleMovieChange}
                sx={{ backgroundColor: '#444444', color: 'white', '& .MuiSelect-icon': { color: 'red' } }}
              >
                {movies.map((movie) => (
                  <MenuItem key={movie.id} value={movie.title} sx={{ backgroundColor: '#333333', color: 'white' }}>
                    {movie.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="showtime-label" sx={{ color: 'white' }}>Select Showtime</InputLabel>
              <Select
                labelId="showtime-label"
                value={selectedShowtime}
                onChange={handleShowtimeChange}
                sx={{ backgroundColor: '#444444', color: 'white', '& .MuiSelect-icon': { color: 'red' } }}
              >
                {showtimes.map((showtime) => (
                  <MenuItem key={showtime.id} value={showtime.time} sx={{ backgroundColor: '#333333', color: 'white' }}>
                    {showtime.time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" color="white">Select Seats</Typography>
            <Grid container spacing={1}>
              {seats.map((seat) => (
                <Grid item xs={3} sm={2} md={1} key={seat.id}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: selectedSeats.includes(seat.id) ? '#C62828' : '#F44336', // Change color if selected
                      color: 'white',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: selectedSeats.includes(seat.id) ? '#B71C1C' : '#C62828', // Change hover color
                      },
                    }}
                    onClick={() => handleSeatSelection(seat.id)}
                    disabled={seat.status === 'booked'} // Disable if seat is booked
                  >
                    {seat.id}
                  </Button>
                </Grid>
              ))}

            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="white">Selected Seats</Typography>
            <Box sx={{ backgroundColor: '#333333', borderRadius: 2, padding: 2 }}>
              <List>
                {selectedSeats.map((seat, index) => (
                  <React.Fragment key={seat}>
                    <ListItem>
                      <ListItemText primary={seat} />
                    </ListItem>
                    {index < selectedSeats.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="white">Payment Details</Typography>
            <form onSubmit={handleSubmitPayment}>
              <TextField
                label="Amount"
                variant="outlined"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)} // Optional: Prevent manual input
                fullWidth
                margin="normal"
                required
                inputProps={{
                  readOnly: true, // Prevent manual changes
                  style: { color: 'white' }, // Set input text color to white
                }}
                InputLabelProps={{
                  style: { color: 'white' }, // Set label color to white
                }}
                sx={{
                  backgroundColor: '#444444',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white', // Set border color to white
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'red', // Change border color on hover
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'red', // Change border color when focused
                  },
                }}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="method-label" sx={{ color: 'white' }}>Payment Method</InputLabel>
                <Select
                  labelId="method-label"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  sx={{ backgroundColor: '#444444', color: 'white', '& .MuiSelect-icon': { color: 'red' } }}
                >
                  <MenuItem value="credit card" sx={{ backgroundColor: '#333333', color: 'white' }}>Credit Card</MenuItem>
                  <MenuItem value="PayPal" sx={{ backgroundColor: '#333333', color: 'white' }}>PayPal</MenuItem>
                  <MenuItem value="bank transfer" sx={{ backgroundColor: '#333333', color: 'white' }}>Bank Transfer</MenuItem>
                  <MenuItem value="cash" sx={{ backgroundColor: '#333333', color: 'white' }}>Cash</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-label" sx={{ color: 'white' }}>Status</InputLabel>
                <Select
                  labelId="status-label"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  sx={{ backgroundColor: '#444444', color: 'white', '& .MuiSelect-icon': { color: 'red' } }}
                >
                  <MenuItem value="pending" sx={{ backgroundColor: '#333333', color: 'white' }}>Pending</MenuItem>
                  <MenuItem value="completed" sx={{ backgroundColor: '#333333', color: 'white' }}>Completed</MenuItem>
                  <MenuItem value="failed" sx={{ backgroundColor: '#333333', color: 'white' }}>Failed</MenuItem>
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
                required
                InputLabelProps={{
                  shrink: true,
                  style: { color: 'white' }, // Set label color to white
                }}
                inputProps={{
                  style: { color: 'white' }, // Set input text color to white
                }}
                sx={{
                  backgroundColor: '#444444',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white', // Set border color to white
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'red', // Change border color on hover
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'red', // Change border color when focused
                  },
                }}
              />

              {error && (
                <Typography color="error" sx={{ marginTop: 2 }}>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2, borderRadius: 2 }}
              >
                Pay For Tickets
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
}

export default Buy;
