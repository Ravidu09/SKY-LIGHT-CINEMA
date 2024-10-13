/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Select, MenuItem, Snackbar, Alert, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const URL = "http://localhost:4001/bookings";

const MovieBooking = () => {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [ticketId, setTicketId] = useState('AUTO_GENERATED_ID'); // Auto-filled
  const [count, setCount] = useState(1);
  const [userId, setUserId] = useState('AUTO_FILLED_USER_ID'); // Auto-filled
  const [showTimeId, setShowTimeId] = useState('10:30'); // Default show time
  const [date, setDate] = useState('');
  const [seat, setSeat] = useState('');
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/movies/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };
    fetchMovie();
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    if (!authState.user) {
      setSnackbarMessage('You need to be logged in to book tickets.');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post(URL, {
        TicketId: ticketId,
        count: Number(count), // Convert to number
        movieId,
        userId,
        showTimeId,
        date,
        seat,
      });
      if (response.status === 201) {
        setSnackbarMessage('Booking added successfully');
        setSnackbarOpen(true);
        navigate('/booking-confirmation', { state: { bookingDetails } });      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Header />

      <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
        <Grid container spacing={3}>
          {/* Movie Information Section */}
          <Grid item xs={12} md={4}>
            {movie && (
              <Card>
                <CardMedia
                  component="img"
                  alt={movie.name}
                  height="300"
                  image={movie.image || 'http://localhost:5173/src/Components/Images/3.png'}
                  title={movie.name}
                />
                <CardContent>
                  <Typography variant="h5">{movie.name}</Typography>
                </CardContent>
              </Card>
            )}
          </Grid>

          {/* Booking Form Section */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              Add New Booking
            </Typography>
            <form onSubmit={handleSubmit}>
              <input
                type="hidden"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
              />
              <TextField
                label="Count"
                variant="outlined"
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                fullWidth
                margin="normal"
                required
                inputProps={{ min: 1 }}
              />

              <input
                type="hidden"
                value={movieId}
              />

              <input
                type="hidden"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />

              <Select
                label="Show Time"
                variant="outlined"
                value={showTimeId}
                onChange={(e) => setShowTimeId(e.target.value)}
                fullWidth
              >
                <MenuItem value="10:30">10:30 AM</MenuItem>
                <MenuItem value="13:30">1:30 PM</MenuItem>
                <MenuItem value="16:30">4:30 PM</MenuItem>
              </Select>

              <TextField
                label="Date"
                variant="outlined"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label="Seat"
                variant="outlined"
                value={seat}
                onChange={(e) => setSeat(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Add Booking
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginTop: 2, marginLeft: 2 }}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              {error && (
                <Typography color="error" sx={{ marginTop: 2 }}>
                  {error}
                </Typography>
              )}
            </form>
          </Grid>
        </Grid>
      </Box>

      <Footer />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MovieBooking;
