/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Print, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddInventory from './AddInventory';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/inventory";

const fetchInventory = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function InventoryDetails() {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddInventoryForm, setShowAddInventoryForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchInventory().then(data => {
      setInventory(data);
    }).catch(error => {
      console.error("Error fetching inventory:", error);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/admindashboard/update-inventory/${id}`);
  };

  const deleteInventory = async (id) => {
    try {
      console.log(`Attempting to delete inventory with ID: ${id}`);
      const response = await axios.delete(`${URL}/${id}`);
      
      console.log('Delete response:', response);
      
      if (response.status === 200) {
        console.log(`Successfully deleted inventory with ID: ${id}`);
        setInventory(prev => {
          const updatedList = prev.filter(item => item._id !== id);
          console.log('Updated inventory list:', updatedList);
          return updatedList;
        });
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting inventory:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Inventory Details Report", 10, 10);

    doc.autoTable({
      head: [['ID', 'Item Name', 'Type', 'Order ID', 'Cost', 'Date', 'Note']],
      body: inventory.map(item => [item.InvID, item.ItemName, item.type, item.OrderID, item.Cost, item.Date, item.Note || 'No Note']),
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

    doc.save('inventory-details.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchInventory().then(data => {
        setInventory(data);
        setNoResults(false);
      }).catch(error => {
        console.error("Error fetching inventory:", error);
      });
      return;
    }

    const filteredInventory = inventory.filter(item =>
      Object.values(item).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setInventory(filteredInventory);
    setNoResults(filteredInventory.length === 0);
  };

  const handleAddInventory = () => {
    setShowAddInventoryForm(true);
  };

  const handleBack = () => {
    setShowAddInventoryForm(false);
  };

  return (
    <Box>
      {showAddInventoryForm ? (
        <Box>
          <AddInventory onBack={handleBack} />
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
              onClick={handleAddInventory}
              sx={{ borderRadius: 2, marginLeft: 'auto' }}
              startIcon={<Add />}
            >
              Add Inventory
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
                      <TableCell colSpan={8} align="center">No inventory found.</TableCell>
                    </TableRow>
                  ) : (
                    inventory.map((item) => (
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
                          <IconButton onClick={() => deleteInventory(item._id)} sx={{ color: 'error.main' }}>
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

export default InventoryDetails;
