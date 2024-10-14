/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Print, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddInventory from './AddInventory';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/inventory";

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
      console.error("Error fetching Maintanance:", error);
    });
  }, []);

  useEffect(() => {
    const handleSearch = () => {
      if (searchQuery.trim() === "") {
        fetchInventory().then(data => {
          setInventory(data);
          setNoResults(false);
        }).catch(error => {
          console.error("Error fetching Maintanance:", error);
        });
        return;
      }

      const filteredInventory = inventory.filter(item =>
        Object.values(item).some(field =>
          field && field.toString().toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      );
      setInventory(filteredInventory);
      setNoResults(filteredInventory.length === 0);
    };

    handleSearch();
  }, [searchQuery]);

  const handleEdit = (id) => {
    navigate(`/admindashboard/update-inventory/${id}`);
  };

  const deleteInventory = async (id) => {
    try {
      console.log(`Attempting to delete Maintanance with ID: ${id}`);
      const response = await axios.delete(`${URL}/${id}`);
      
      console.log('Delete response:', response);
      
      if (response.status === 200) {
        console.log(`Successfully deleted Maintanance with ID: ${id}`);
        setInventory(prev => {
          const updatedList = prev.filter(item => item._id !== id);
          console.log('Updated inventory list:', updatedList);
          return updatedList;
        });
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting Maintanance:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();

    // Add a title and subtitle for Skylight Cinema
    doc.setFontSize(18);
    doc.text("Skylight Cinema", 10, 10);
    
    doc.setFontSize(14);
    doc.text("Maintenance Details Report", 10, 20);

    // Create the table with maintenance details
    doc.autoTable({
      head: [['ID', 'Item Name', 'Type', 'Maintenance ID', 'Cost', 'Date', 'Note']],
      body: inventory.map(item => [
        item.InvID, 
        item.ItemName, 
        item.type, 
        item.MaintananceID, 
        item.Cost, 
        new Date(item.Date).toLocaleDateString(), 
        item.Note || 'No Note'
      ]),
      startY: 30,
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

    // Save the PDF with a custom filename
    doc.save('Skylight_Cinema_Maintenance_Details.pdf');
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
              color="secondary"
              onClick={handleAddInventory}
              sx={{ borderRadius: 2, marginLeft: 'auto' }}
              startIcon={<Add />}
            >
              Add Maintenance
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
                    <TableCell>Maintenance ID</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Note</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noResults ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">No Maintenance found.</TableCell>
                    </TableRow>
                  ) : (
                    inventory.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.InvID}</TableCell>
                        <TableCell>{item.ItemName}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.MaintananceID}</TableCell>
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
