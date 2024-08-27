/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton, Typography } from '@mui/material';
import { Edit, Delete, Print, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddFeedback from './AddFeedback'; // Ensure path is correct
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/feedback";

const fetchFeedbacks = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function FeedbackDetails() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddFeedbackForm, setShowAddFeedbackForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedbacks().then(data => {
      console.log("Fetched feedbacks:", data); // Debugging
      setFeedbacks(data);
    }).catch(error => {
      console.error("Error fetching feedbacks:", error);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/admindashboard/update-feedback/${id}`);
  };

  const deleteFeedback = async (id) => {
    try {
      const response = await axios.delete(`${URL}/${id}`);
      if (response.status === 200) {
        setFeedbacks(prev => prev.filter(feedback => feedback._id !== id));
      }
    } catch (error) {
      console.error("Error deleting feedback:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Feedback Details Report", 10, 10);

    doc.autoTable({
      head: [['ID', 'Customer ID', 'Jewellery ID', 'Rating', 'Comment']],
      body: feedbacks.map(feedback => [feedback.feedbackId, feedback.customerId, feedback.jewelleryId, feedback.rating, feedback.comment]),
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

    doc.save('feedback-details.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchFeedbacks().then(data => {
        setFeedbacks(data);
        setNoResults(false);
      }).catch(error => {
        console.error("Error fetching feedbacks:", error);
      });
      return;
    }

    const filteredFeedbacks = feedbacks.filter(feedback =>
      Object.values(feedback).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFeedbacks(filteredFeedbacks);
    setNoResults(filteredFeedbacks.length === 0);
  };

  const handleAddFeedback = () => {
    setShowAddFeedbackForm(true);
  };

  const handleBack = () => {
    setShowAddFeedbackForm(false);
  };

  return (
    <Box>
      {showAddFeedbackForm ? (
        <Box>
          <AddFeedback onBack={handleBack} />
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
              onClick={handleAddFeedback}
              sx={{ borderRadius: 2, marginLeft: 'auto' }}
              startIcon={<Add />}
            >
              Add Feedback
            </Button>
          </Box>

          <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
            <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Customer ID</TableCell>
                    <TableCell>Jewellery ID</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Comment</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noResults ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">No feedback found.</TableCell>
                    </TableRow>
                  ) : (
                    feedbacks.map((feedback) => (
                      <TableRow key={feedback._id}>
                        <TableCell>{feedback.feedbackId}</TableCell>
                        <TableCell>{feedback.customerId}</TableCell>
                        <TableCell>{feedback.jewelleryId}</TableCell>
                        <TableCell>{feedback.rating}</TableCell>
                        <TableCell>{feedback.comment}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(feedback._id)} sx={{ color: 'primary.main' }}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => deleteFeedback(feedback._id)} sx={{ color: 'error.main' }}>
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

export default FeedbackDetails;
