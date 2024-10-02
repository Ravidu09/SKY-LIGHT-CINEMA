import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Container, Typography, TextField, Button, Grid, Card, CardMedia, CardContent, CircularProgress } from '@mui/material';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchMovies().then(data => {
      setMovies(data);
      setLoading(false); // Set loading to false once data is fetched
    }).catch(error => {
      console.error("Error fetching movies:", error);
      setLoading(false); // Ensure loading is set to false on error
    });
  }, []);

  const handleSearch = (query = searchQuery) => {
    if (query.trim() === "") {
      fetchMovies().then(data => {
        setMovies(data);
      }).catch(error => {
        console.error("Error fetching movies:", error);
      });
      return;
    }

    const filteredMovies = movies.filter(item =>
      item.name && item.name.toLowerCase().includes(query.toLowerCase())
    );
    setMovies(filteredMovies);
  };

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
            width="600"
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
                        height="200"
                        image={item.image || 'http://localhost:5173/src/Components/Images/3.png'}
                        title={item.name}
                      />
                    </Link>
                    <CardContent>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        Title: {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
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
          Up Coming!
        </Typography>
        
        {loading ? (
          <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: '40px' }} />
        ) : (
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            width="700"
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
                        height="200"
                        image={item.image || 'http://localhost:5173/src/Components/Images/3.png'}
                        title={item.name}
                      />
                    </Link>
                    <CardContent>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        Title: {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
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
