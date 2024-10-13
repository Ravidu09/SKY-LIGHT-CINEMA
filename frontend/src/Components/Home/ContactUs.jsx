/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Typography } from '@mui/material';
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function ContactUs() {
  return (
    <div>
      <Header />
      <Container maxWidth="sm" sx={{ marginTop: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Contact Us
        </Typography>
        
        <Typography variant="body1" align="center" paragraph>
          We would love to hear from you! Please feel free to reach out using the information below.
        </Typography>
        
        <Typography variant="h6" align="center" gutterBottom>
          You can also reach us at:
        </Typography>
        
        <Typography variant="body1" align="center">
          Phone: (123) 456-7890
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Email: <a href="mailto:SkyLightCinema@gmail.com" style={{ color: 'inherit', textDecoration: 'underline' }}>SkyLightCinema@gmail.com</a>
        </Typography>
      </Container>
      <Footer />
    </div>
  );
}

export default ContactUs;
