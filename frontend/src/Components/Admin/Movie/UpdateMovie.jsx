/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/jewellery";

function UpdateJewellery() {
  const { JID } = useParams();
  const [jewellery, setJewellery] = useState({
    image: '',
    name: '',
    price: '',
    quantity: '',
    status: 'available'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching jewellery with JID:", JID);
    const fetchJewellery = async () => {
      try {
        const response = await axios.get(`${URL}/${JID}`);
        console.log("Fetched jewellery data:", response.data);
        setJewellery(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jewellery:", error);
        setError(error.response ? error.response.data.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchJewellery();
  }, [JID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJewellery({ ...jewellery, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${URL}/${JID}`, jewellery);
      alert('Jewellery updated successfully');
      navigate('/admindashboard/jewellery-management');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>Update Jewellery</Typography>
      <TextField
        label="Image URL"
        name="image"
        value={jewellery.image}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Name"
        name="name"
        value={jewellery.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={jewellery.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        name="quantity"
        type="number"
        value={jewellery.quantity}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Status"
        name="status"
        select
        SelectProps={{ native: true }}
        value={jewellery.status}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <option value="available">Available</option>
        <option value="out of stock">Out of Stock</option>
      </TextField>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        sx={{ marginTop: 2 }}
      >
        Update Jewellery
      </Button>
      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default UpdateJewellery;
