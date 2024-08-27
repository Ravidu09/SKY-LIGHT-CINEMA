/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

// Import images from the Images folder
import movie1 from '../Images/movie1.jpg'; // Adjust these paths according to your file structure
import movie2 from '../Images/movie2.jpg';
import movie3 from '../Images/movie3.jpg';
import movie4 from '../Images/movie4.jpg';

const movies = [
  {
    title: 'Planet of Apes',
    image: movie1,
    description: 'This is a brief description of Movie 1.'
  },
  {
    title: 'The Garfield Movie',
    image: movie2,
    description: 'This is a brief description of Movie 2.'
  },
  {
    title: 'Deadpool x Vouwariene',
    image: movie3,
    description: 'This is a brief description of Movie 3.'
  },
  {
    title: 'The Garfield Movie',
    image: movie4,
    description: 'This is a brief description of Movie 4.'
  },
];

function Movie() {
  const navigate = useNavigate();

  const handleBooking = (title) => {
    navigate('/Show', { state: { movieTitle: title } });
  };

  return (
    <div>
      <Header />
      <Box sx={{ padding: 4, backgroundColor: '#000000' }}>
        <Typography variant="h3" align="center" color="red" gutterBottom>
          Now Showing
        </Typography>
        <Grid container spacing={4}>
          {movies.map((movie, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.image}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ marginTop: 2 }}
                    onClick={() => handleBooking(movie.title)}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h3" align="center" color="red" gutterBottom>
          <br></br>Upcoming Movies
        </Typography>
        <Grid container spacing={4}>
          {movies.map((movie, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.image}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ marginTop: 2 }}
                    onClick={() => handleBooking(movie.title)}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </div>
  );
}

export default Movie;
