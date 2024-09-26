import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Print, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddPayment from './AddPayment'; // Ensure you have an AddPayment component
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/payments";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function PaymentDetails() {
  const [allPayments, setAllPayments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => {
      setAllPayments(data);
      setPayments(data);
    }).catch(error => {
      console.error("Error fetching payments:", error);
    });
  }, []);

  const handleEdit = (paymentId) => {
    navigate(`/admindashboard/update-payment/${paymentId}`);
  };

  const deletePayment = async (paymentId) => {
    try {
      const response = await axios.delete(`${URL}/${paymentId}`);
      if (response.status === 200) {
        setAllPayments(prev => prev.filter(payment => payment.paymentId !== paymentId));
        setPayments(prev => prev.filter(payment => payment.paymentId !== paymentId));
      } else {
        console.error("Unexpected response status:", response.status);
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
      body: payments.map(payment => [
        payment.paymentId,
        `$${payment.amount.toFixed(2)}`,
        payment.method,
        payment.status,
        new Date(payment.transactionDate).toLocaleString()
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

    doc.save('payment-details.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setPayments(allPayments);
      setNoResults(false);
      return;
    }

    const filteredPayments = allPayments.filter(payment =>
      Object.values(payment).some(field =>
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
                    payments.map((payment) => (
                      <TableRow key={payment.paymentId}>
                        <TableCell>{payment.paymentId}</TableCell>
                        <TableCell>${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>{payment.status}</TableCell>
                        <TableCell>{new Date(payment.transactionDate).toLocaleString()}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(payment.paymentId)} sx={{ color: 'primary.main' }}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => deletePayment(payment.paymentId)} sx={{ color: 'error.main' }}>
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
