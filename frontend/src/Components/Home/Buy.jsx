/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, Grid, Typography, MenuItem, FormControl, InputLabel, Select, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

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

function Buy() {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleMovieChange = (e) => {
    setSelectedMovie(e.target.value);
  };

  const handleShowtimeChange = (e) => {
    setSelectedShowtime(e.target.value);
  };

  const handleSeatSelection = (seatId) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seatId) ? prevSeats.filter(id => id !== seatId) : [...prevSeats, seatId]
    );
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
                sx={{ backgroundColor: '#333333', color: 'white', '& .MuiSelect-icon': { color: 'red' } }}
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
                sx={{ backgroundColor: '#333333', color: 'white', '& .MuiSelect-icon': { color: 'red' } }}
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
                      backgroundColor: seat.status === 'available' ? '#F44336' : '#B71C1C',
                      color: 'white',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: seat.status === 'available' ? '#C62828' : '#d32f2f',
                      },
                    }}
                    onClick={() => handleSeatSelection(seat.id)}
                    disabled={seat.status === 'booked'}
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
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ mt: 2, borderRadius: 2 }}
              onClick={() => alert(`Booking ${selectedSeats.join(', ')} seats`)}
            >
              Pay For Tickets
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
}

export default Buy;
