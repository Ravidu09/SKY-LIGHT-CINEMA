import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Container, Typography, CircularProgress, Card, CardMedia, CardContent, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const URL = "http://localhost:4001/movies";

const fetchMovies = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies().then(data => {
      setMovies(data);
      setLoading(false);
    }).catch(error => {
      console.error("Error fetching movies:", error);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Header />
      <Container sx={{ padding: '40px 0' }}>
        <Typography variant="h4" align="left" gutterBottom sx={{ marginTop: '20px', fontWeight: 'bold' }}>
          Now Showing!
        </Typography>
        
        {loading ? (
          <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: '40px' }} />
        ) : (
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            navigation
            breakpoints={{
              320: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              960: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }
            }}
          >
            {movies
              .filter(item => item.status === 'available') // Filter for available movies
              .map(item => (
                <SwiperSlide key={item._id}>
                  <Card
                    sx={{
                      width: '240px', // Fixed width for consistency
                      height: '400px', // Fixed height to maintain uniformity
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                  >
                    <Link to={`/movies/${item._id}`}>
                      <CardMedia
                        component="img"
                        alt={item.name}
                        height="300" // Fixed height for the image
                        image={item.image || 'http://localhost:5173/src/Components/Images/3.png'}
                        title={item.name}
                        sx={{ objectFit: 'cover' }} // Ensure image is contained within fixed size
                      />
                    </Link>
                    <CardContent>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px' }}>
                        IMDB Rate: {item.rate}
                      </Typography>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </Container>
      
      <Container sx={{ padding: '40px 0' }}>
        <Typography variant="h4" align="left" gutterBottom sx={{ marginTop: '20px', fontWeight: 'bold' }}>
          Upcoming Movies
        </Typography>
        
        {loading ? (
          <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: '40px' }} />
        ) : (
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            navigation
            breakpoints={{
              320: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              960: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }
            }}
          >
            {movies
              .filter(item => item.status === 'Up Coming!') // Filter for upcoming movies
              .map(item => (
                <SwiperSlide key={item._id}>
                  <Card
                    sx={{
                      width: '240px', // Fixed width for consistency
                      height: '400px', // Fixed height to maintain uniformity
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                  >
                    <Link to={`/movies/${item._id}`}>
                      <CardMedia
                        component="img"
                        alt={item.name}
                        height="300"
                        image={item.image || 'http://localhost:5173/src/Components/Images/3.png'}
                        title={item.name}
                        sx={{ objectFit: 'cover' }} // Ensure image is contained within fixed size
                      />
                    </Link>
                    <CardContent>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px' }}>
                        IMDB Rate: {item.rate}
                      </Typography>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </Container>

      <Footer />
    </div>
  );
}

export default MoviePage;
