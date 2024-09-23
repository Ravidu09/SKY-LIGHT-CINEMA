import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Typography, Button, TextField, Snackbar, Alert } from '@mui/material';
import { Grid, Card, CardMedia, CardContent, Box,  } from '@mui/material'; // Added Rating
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { AuthContext } from '../Auth/AuthContext';

const MovieBooking = () => {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [ticketId, setTicketId] = useState('');
  const [count, setCount] = useState(1);
  const [userId, setUserId] = useState('');
  const [images, setImages] = useState([]);
  const [showTimeId, setShowTimeId] = useState('');
  const [date, setDate] = useState('');
  const [seat, setSeat] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch movie details
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/movies/${movieId}`);
        setMovie(response.data);
        setImages(response.data.images || []);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    // Fetch showtimes
    const fetchShowtimes = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/showtimes?movieId=${movieId}`);
        setShowtimes(response.data);
      } catch (error) {
        console.error('Error fetching showtimes:', error);
      }
    };

    fetchMovie();
    fetchShowtimes();
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authState.user) {
      setSnackbarMessage('You need to be logged in to book tickets.');
      setSnackbarOpen(true);
      return;
    }

    // Here you would typically handle the booking logic (e.g., sending a request to the server)
    try {
      const bookingData = {
        ticketId,
        count,
        movieId,
        userId,
        showTimeId,
        date,
        seat,
      };

      await axios.post('http://localhost:4001/bookings', bookingData);
      setSnackbarMessage('Booking confirmed!');
      setSnackbarOpen(true);
      // Optionally redirect to another page
      // navigate('/some-path');
    } catch (error) {
      setError('Error creating booking. Please try again.');
      console.error(error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      
      <Container>
        
      <Card>
              <CardMedia
                component="img"
                alt={movie.name}
                height="500"
                image={movie.image || 'http://localhost:5173/src/Components/Images/3.png'}
                title={movie.name}
              />
              <CardContent>
                <Box sx={{ display: 'flex', overflowX: 'auto' }}>
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Image ${index}`}
                      style={{ width: '100%', maxWidth: '400px', marginRight: '10px' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Ticket ID"
            variant="outlined"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            fullWidth
            margin="normal"
            required
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
          <TextField
            label="Movie ID"
            variant="outlined"
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
            fullWidth
            margin="normal"
            required
            disabled // Assuming movieId is derived from the route
          />
          <TextField
            label="User ID"
            variant="outlined"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Show Time"
            variant="outlined"
            select
            SelectProps={{ native: true }}
            value={showTimeId}
            onChange={(e) => setShowTimeId(e.target.value)}
            fullWidth
            margin="normal"
            required
          >
            <option value="">Select Show Time</option>
            {showtimes.map((showtime) => (
              <option key={showtime.id} value={showtime.id}>
                {showtime.time}
              </option>
            ))}
          </TextField>
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
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            Back
          </Button>
          {error && (
            <Typography color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}
        </form>
      </Container>
      <Footer />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default MovieBooking;
