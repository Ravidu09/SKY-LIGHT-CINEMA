import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

// Background image URL
const backgroundImage = 'https://adornabride.com/cdn/shop/products/2019-08-2209.01.16_8c8cfb38-f411-4564-9dbf-2e7c43b42d91.jpg?v=1639536050&width=1426';
const URL = "http://localhost:4001/employees";

const styles = {
  container: {
    position: 'relative', // Position for the pseudo-element
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center items horizontally
    justifyContent: 'flex-start', // Align items to the top
    height: '100vh', // Full viewport height
    overflow: 'hidden', // Hide overflow to keep the blur within bounds
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${backgroundImage})`, // Set the background image
    backgroundSize: 'cover', // Cover the entire container
    backgroundPosition: 'center', // Center the background image
    filter: 'blur(3px)', // Apply blur effect
    zIndex: 0, // Place it behind the content
  },
};

function UpdateEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    EMPID: '',
    name: '',
    email: '',
    position: '',
    phone: '',
    address: '',
    salary: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setError(error.response ? error.response.data.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });

    // Reset error messages when the user starts typing
    if (name === 'name') setNameError('');
    if (name === 'email') setEmailError('');
    if (name === 'phone') setPhoneError('');
  };

  // Function to validate name (no numbers or special characters)
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  // Function to validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate phone (must be exactly 10 digits and only numbers)
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleUpdate = async () => {
    setError(null);
    setNameError('');
    setEmailError('');
    setPhoneError('');

    // Check for name validation
    if (!validateName(employee.name)) {
      setNameError('Name cannot contain numbers or special characters');
      return;
    }

    // Check for email validation
    if (!validateEmail(employee.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Check for phone validation
    if (!validatePhone(employee.phone)) {
      setPhoneError('Phone number must be exactly 10 digits and contain only numbers');
      return;
    }

    try {
      await axios.put(`${URL}/${id}`, employee);
      alert('Employee updated successfully');
      navigate('/admindashboard/employee-details');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.backgroundImage} />
      <Box sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // White background with transparency
        borderRadius: 1,
        padding: 3,
        width: '600px', // Set width for the form
        zIndex: 1, // Bring the form above the blurred background
        marginTop: 5 // Added margin for space at the top
      }}>
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            color: 'black', 
            fontWeight: 'bold', // Make the text bold
            textAlign: 'center' // Center the text
          }}
        >
          Update Employee
        </Typography><br />
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
        /><br />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
        >
          Update Employee
        </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ marginTop: 3 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default UpdateEmployee;
