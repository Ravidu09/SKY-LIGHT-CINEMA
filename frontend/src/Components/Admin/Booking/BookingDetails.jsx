import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  IconButton,
} from '@mui/material';
import { Edit, Delete, Print, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddBooking from './AddBooking'; // Ensure this component is correctly set up
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/bookings";

const fetchBookings = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function BookingDetails() {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddBookingForm, setShowAddBookingForm] = useState(false);
  const [editBooking, setEditBooking] = useState(null); // State to manage edit mode

  const navigate = useNavigate();

  // Function to load bookings
  const loadBookings = async () => {
    try {
      const data = await fetchBookings();
      setBookings(data);
      setNoResults(data.length === 0);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    loadBookings(); // Load bookings on component mount
  }, []);

  const handleEdit = (id) => {   
     navigate(`/admindashboard/update-booking/${id}`);
  // Show the UpdateBooking form
  };

  const deleteBooking = async (id) => {
    try {
      const response = await axios.delete(`${URL}/${id}`);
      if (response.status === 200) {
        loadBookings(); // Reload bookings to get updated list
        alert("Booking deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting booking:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Booking Details Report", 10, 10);

    doc.autoTable({
      head: [['Booking ID', 'Count', 'Movie Name', 'Show Time', 'Date', 'Seat Type']],
      body: bookings.map(item => [
        item.BookingId,
        item.count,
        item.movieId,
        item.showTimeId,
        new Date(item.date).toLocaleDateString(),
        item.seat,
      ]),
      startY: 20,
      margin: { top: 20 },
      styles: {
        overflow: 'linebreak',
        fontSize: 10,
      },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
      },
    });

    doc.save('booking-details.pdf');
  };

  const handleSearch = useCallback(() => {
    if (searchQuery.trim() === "") {
      loadBookings(); // Reload bookings if search is empty
      return;
    }

    const filteredBookings = bookings.filter(item =>
      Object.values(item).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setBookings(filteredBookings);
    setNoResults(filteredBookings.length === 0);
  }, [searchQuery, bookings]);

  const handleAddBooking = () => {
    setEditBooking(null); // Clear any existing booking for adding a new one
    setShowAddBookingForm(true);
  };

  const handleBack = () => {
    setShowAddBookingForm(false);
  };

  return (
    <Box>
      {showAddBookingForm ? (
        <Box>
          <AddBooking booking={editBooking} onBack={handleBack} />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, alignItems: 'center' }}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                flexShrink: 1,
                width: '200px',
                backgroundColor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.300',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ borderRadius: 2 }}
            >
              Search
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddBooking}
              sx={{ borderRadius: 2, marginLeft: 'auto' }}
              startIcon={<Add />}
            >
              Add Booking
            </Button>
          </Box>

          <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
            <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Booking ID</TableCell>
                    <TableCell>Count</TableCell>
                    <TableCell>Movie Name</TableCell>
                    <TableCell>Show Time</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Seat Type</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noResults ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">No booking found.</TableCell>
                    </TableRow>
                  ) : (
                    bookings.map((item) => (
                      <TableRow key={item.BookingId}>
                        <TableCell>{item.BookingId}</TableCell>
                        <TableCell>{item.count}</TableCell>
                        <TableCell>{item.movieId}</TableCell>
                        <TableCell>{item.showTimeId}</TableCell>
                        <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                        <TableCell>{item.seat}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(item._id)} sx={{ color: 'primary.main' }}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => deleteBooking(item._id)} sx={{ color: 'error.main' }}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              variant="contained"
              color="primary"
              onClick={handlePDF}
              sx={{ marginTop: 2, borderRadius: 2 }}
            >
              <Print /> Download
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default BookingDetails;
