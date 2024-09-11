/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Print, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddPayment from './AddPayment';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/Payment";

const fetchPayment = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function PaymentDetails() {
  const [Payment, setPayment] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPayment().then(data => {
      setPayment(data);
    }).catch(error => {
      console.error("Error fetching Payment:", error);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/admindashboard/update-Payment/${id}`);
  };

  const deletePayment = async (id) => {
    try {
      console.log(`Attempting to delete Payment with ID: ${id}`);
      const response = await axios.delete(`${URL}/${id}`);
      
      console.log('Delete response:', response);
      
      if (response.status === 200) {
        console.log(`Successfully deleted Payment with ID: ${id}`);
        setPayment(prev => {
          const updatedList = prev.filter(item => item._id !== id);
          console.log('Updated Payment list:', updatedList);
          return updatedList;
        });
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting Payment:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Payment Details Report", 10, 10);

    doc.autoTable({
      head: [['ID', 'Item Name', 'Type', 'Order ID', 'Cost', 'Date', 'Note']],
      body: Payment.map(item => [item.InvID, item.ItemName, item.type, item.OrderID, item.Cost, item.Date, item.Note || 'No Note']),
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

    doc.save('Payment-details.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchPayment().then(data => {
        setPayment(data);
        setNoResults(false);
      }).catch(error => {
        console.error("Error fetching Payment:", error);
      });
      return;
    }

    const filteredPayment = Payment.filter(item =>
      Object.values(item).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setPayment(filteredPayment);
    setNoResults(filteredPayment.length === 0);
  };

  const handleAddPayment = () => {
    setShowAddPaymentForm(true);
  };

  const handleBack = () => {
    setShowAddPaymentForm(false);
  };

  return (
    <Box>
      {showAddPaymentForm ? (
        <Box>
          <AddPayment onBack={handleBack} />
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
              onClick={handleAddPayment}
              sx={{ borderRadius: 2, marginLeft: 'auto' }}
              startIcon={<Add />}
            >
              Add Payment
            </Button>
          </Box>

          <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
            <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Note</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noResults ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">No Payment found.</TableCell>
                    </TableRow>
                  ) : (
                    Payment.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.InvID}</TableCell>
                        <TableCell>{item.ItemName}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.OrderID}</TableCell>
                        <TableCell>{item.Cost}</TableCell>
                        <TableCell>{new Date(item.Date).toLocaleDateString()}</TableCell>
                        <TableCell>{item.Note || 'No Note'}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(item._id)} sx={{ color: 'primary.main' }}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => deletePayment(item._id)} sx={{ color: 'error.main' }}>
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

export default PaymentDetails;
