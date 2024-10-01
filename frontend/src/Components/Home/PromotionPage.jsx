import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Container, Typography, TextField, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const URL = "http://localhost:4001/promotions"; // URL to fetch promotions

const fetchPromotions = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching promotions:", error);
    throw error;
  }
};

function PromotionPage() {
  const [promotions, setPromotions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPromotions().then(data => {
      setPromotions(data);
    }).catch(error => {
      console.error("Error fetching promotions:", error);
    });
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchPromotions().then(data => {
        setPromotions(data);
      }).catch(error => {
        console.error("Error fetching promotions:", error);
      });
      return;
    }

    const filteredPromotions = promotions.filter(item =>
      Object.values(item).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setPromotions(filteredPromotions);
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Header />
      <br />
      <Container>
        <Grid container justifyContent="left" alignItems="left" spacing={2} sx={{ marginBottom: '20px' }}>
          <Grid item>
            <TextField
              label="Search Promotions"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: '300px',
                backgroundColor: 'white',
                borderRadius: 1,
                padding: '1px'
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{
                borderRadius: 2,
                padding: '10px 20px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        <Typography variant="h4" align="left" gutterBottom sx={{ marginTop: '20px', fontWeight: 'bold' }}>
          Promotions Available!
        </Typography>
        <Swiper
          spaceBetween={20}
          slidesPerView={1} // Change this to 1 for vertical stacking
          navigation
        >
          {promotions.map(item => (
            <SwiperSlide key={item._id}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column', // Stack children vertically
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  },
                  height: '100%' // Ensure card height is consistent
                }}
              >
                <Link to={`/promotions/${item._id}`}>
                  <CardMedia
                    component="img"
                    alt={item.title}
                    height="200" // Reduced height for better vertical layout
                    image={item.image || 'http://localhost:5173/src/Components/Images/3.png'}
                    title={item.title}
                  />
                </Link>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    Title: {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Discount: {item.discountPercentage}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Expiry Date: {item.expiryDate} {/* Assuming expiryDate is part of the promotion */}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description: {item.description} {/* Assuming description is part of the promotion */}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
      <Footer />
    </div>
  );
}

export default PromotionPage;
