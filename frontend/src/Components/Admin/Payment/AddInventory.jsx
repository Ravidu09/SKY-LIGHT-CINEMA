/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/inventory";

function AddInventory({ onBack }) {
  const [ItemName, setItemName] = useState('');
  const [type, setType] = useState('');
  const [OrderID, setOrderID] = useState('');
  const [Cost, setCost] = useState('');
  const [Date, setDate] = useState('');
  const [Note, setNote] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(URL, { ItemName, type, OrderID, Cost, Date, Note });
      if (response.status === 201) {
        alert('Inventory added successfully');
        navigate('/admindashboard/inventory-management');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
      <Typography variant="h5" gutterBottom>
        Add New Inventory
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Item Name"
          variant="outlined"
          value={ItemName}
          onChange={(e) => setItemName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Type"
          variant="outlined"
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Order ID"
          variant="outlined"
          value={OrderID}
          onChange={(e) => setOrderID(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Cost"
          variant="outlined"
          type="number"
          value={Cost}
          onChange={(e) => setCost(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          variant="outlined"
          type="date"
          value={Date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Note"
          variant="outlined"
          value={Note}
          onChange={(e) => setNote(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Add Inventory
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginTop: 2, marginLeft: 2 }}
          onClick={onBack}
        >
          Back
        </Button>
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </form>
    </Box>
  );
}

export default AddInventory;
