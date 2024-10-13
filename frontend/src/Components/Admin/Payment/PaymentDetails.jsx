/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Print, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddPayment from './AddPayment';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/payment";

const fetchPayments = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function PaymentDetails() {
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments().then(data => {
      setPayments(data);
    }).catch(error => {
      console.error("Error fetching payments:", error);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/admindashboard/update-payment/${id}`);
  };

  const deletePayment = async (id) => {
    try {
      const response = await axios.delete(`${URL}/${id}`);
      if (response.status === 200) {
        setPayments(prev => prev.filter(item => item._id !== id));
      }
    } catch (error) {
      console.error("Error deleting payment:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Payment Details Report", 10, 10);

    doc.autoTable({
      head: [['Payment ID', 'Amount', 'Method', 'Status', 'Transaction Date']],
      body: payments.map(item => [item.PID, item.amount, item.method, item.status, new Date(item.transactionDate).toLocaleDateString()]),
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

    doc.save('payment-details.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchPayments().then(data => {
        setPayments(data);
        setNoResults(false);
      }).catch(error => {
        console.error("Error fetching payments:", error);
      });
      return;
    }

    const filteredPayments = payments.filter(item =>
      Object.values(item).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setPayments(filteredPayments);
    setNoResults(filteredPayments.length === 0);
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
                    <TableCell>Payment ID</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Method</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Transaction Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noResults ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">No payments found.</TableCell>
                    </TableRow>
                  ) : (
                    payments.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.PID}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>{item.method}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>{new Date(item.transactionDate).toLocaleDateString()}</TableCell>
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
