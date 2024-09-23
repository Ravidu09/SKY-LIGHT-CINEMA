/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Print, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddMovie from './AddMovie';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/movies";

const fetchMovie = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function MovieDetails() {
  const [movie, setMovie] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddMovieForm, setShowAddMovieForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMovie().then(data => {
      setMovie(data);
    }).catch(error => {
      console.error("Error fetching movie:", error);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/admindashboard/update-movie/${id}`);
  };

  const deleteMovie = async (id) => {
    try {
      console.log(`Attempting to delete movie with ID: ${id}`); // Log the ID being deleted
      const response = await axios.delete(`${URL}/${id}`);
      
      console.log('Delete response:', response); // Log the response
      
      if (response.status === 200) {
        console.log(`Successfully deleted movie with ID: ${id}`);
        // Update state to remove the deleted movie item
        setMovie(prev => {
          const updatedList = prev.filter(item => item._id !== id); // Filter by MongoDB _id
          console.log('Updated movie list:', updatedList); // Log the updated list
          return updatedList;
        });
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting movie:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Movie Details Report", 10, 10);

    doc.autoTable({
      head: [['Movie ID', 'Name', 'Rate', 'Description', 'Status']],
      body: movie.map(item => [item.MID, item.name, item.rate, item.description, item.status]),
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

    doc.save('movie-details.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchMovie().then(data => {
        setMovie(data);
        setNoResults(false);
      }).catch(error => {
        console.error("Error fetching movie:", error);
      });
      return;
    }

    const filteredMovie = movie.filter(item =>
      Object.values(item).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setMovie(filteredMovie);
    setNoResults(filteredMovie.length === 0);
  };

  const handleAddMovie = () => {
    setShowAddMovieForm(true);
  };

  const handleBack = () => {
    setShowAddMovieForm(false);
  };

  return (
    <Box>
      {showAddMovieForm ? (
        <Box>
          <AddMovie onBack={handleBack} />
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
              onClick={handleAddMovie}
              sx={{ borderRadius: 2, marginLeft: 'auto' }}
              startIcon={<Add />}
            >
              Add Movie
            </Button>
          </Box>

          <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
            <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Movie ID</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Ratings</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noResults ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">No movie found.</TableCell>
                    </TableRow>
                  ) : (
                    movie.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.MID}</TableCell>
                        <TableCell>
                          <img src={item.image || 'default-image-path'} alt={item.name} style={{ width: '50px', height: '50px' }} />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.rate}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(item._id)} sx={{ color: 'primary.main' }}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => deleteMovie(item._id)} sx={{ color: 'error.main' }}>
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

export default MovieDetails;
