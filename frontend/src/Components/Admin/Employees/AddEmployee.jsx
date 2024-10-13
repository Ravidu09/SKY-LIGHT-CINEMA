/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/employees/create";

function AddEmployee({ onBack }) {
  const [employee, setEmployee] = useState({
    EMPID: '',
    name: '',
    email: '',
    position: '',
    phone: '',
    address: '',
    salary: ''
  });
  
  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });

    if (name === 'name') setNameError('');
    if (name === 'email') setEmailError('');
    if (name === 'phone') setPhoneError('');
  };

  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setNameError('');
    setEmailError('');
    setPhoneError('');

    if (!validateName(employee.name)) {
      setNameError('Name cannot contain numbers or special characters');
      return;
    }

    if (!validateEmail(employee.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!validatePhone(employee.phone)) {
      setPhoneError('Phone number must be exactly 10 digits and contain only numbers');
      return;
    }

    try {
      await axios.post(URL, employee);
      alert('Employee added successfully');
      navigate('/admindashboard/employee-details');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        margin: 0,
        padding: 0,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          padding: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 1,
          width: '40%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Add New Employee
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!nameError}
            helperText={nameError}
          />
          <TextField
            label="Email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!emailError}
            helperText={emailError}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="position-label">Position</InputLabel>
            <Select
              labelId="position-label"
              name="position"
              value={employee.position}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="Senior Manager">Senior Manager</MenuItem>
              <MenuItem value="Junior Manager">Junior Manager</MenuItem>
              <MenuItem value="Trainee">Trainee</MenuItem>
              <MenuItem value="Software Engineer">Software Engineer</MenuItem>
              <MenuItem value="Web Developer">Web Developer</MenuItem>
              <MenuItem value="Jewelry Designer">Jewelry Designer</MenuItem>
              <MenuItem value="Project Coordinator">Project Coordinator</MenuItem>
              <MenuItem value="Marketing Executive">Marketing Executive</MenuItem>
              <MenuItem value="Sales Representative">Sales Representative</MenuItem>
              <MenuItem value="Photographer/Content Creator">Photographer/Content Creator</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Phone"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!phoneError}
            helperText={phoneError}
          />
          <TextField
            label="Address"
            name="address"
            value={employee.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Salary"
            name="salary"
            type="number"
            value={employee.salary}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ borderRadius: 1 }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 4,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '200px' }}
            >
              Add Employee
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onBack}
              sx={{ width: '200px', marginLeft: 2 }}
            >
              Back
            </Button>
          </Box>
          {error && (
            <Typography color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </Box>
  );
}

export default AddEmployee;
