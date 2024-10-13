/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Typography, Grid, Box, Paper } from '@mui/material';
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function AboutUs() {
  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to Sky Light Cinema, where we bring the magic of movies to life! 
          Our mission is to provide an exceptional cinematic experience for all movie lovers. 
          With state-of-the-art technology and a passion for film, we aim to create unforgettable moments.
        </Typography>
        <Typography variant="h4" gutterBottom>
          Our History
        </Typography>
        <Typography variant="body1" paragraph>
          Founded in 2024, Sky Light Cinema started as a small theater with a big dream. 
          Over the years, we've expanded our services and upgraded our facilities to ensure 
          our patrons enjoy the best movie experience possible.
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <img src="path_to_your_image" alt="Cinema" style={{ width: '100%', height: 'auto' }} />
              {/* Replace with actual image URLs or imported images */}
            </Paper>
          </Grid>
          {/* Add more Grid items for additional images */}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default AboutUs;
