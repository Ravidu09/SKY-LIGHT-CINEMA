import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton} from '@mui/material';
import { Edit, Delete, Print, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Addstaff from './AddStaff'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/staffs";

const fetchstaffs = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function staffDetails() {
  const [staffs, setstaffs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddstaffForm, setShowAddstaffForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchstaffs().then(data => {
      setstaffs(data);
    }).catch(error => {
      console.error("Error fetching staffs:", error);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/admindashboard/update-staff/${id}`);
  };

  const deletestaff = async (id) => {
    try {
      const response = await axios.delete(`${URL}/${id}`);
      if (response.status === 200) {
        setstaffs(prev => prev.filter(staff => staff._id !== id));
      }
    } catch (error) {
      console.error("Error deleting staff:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("staff Details Report", 10, 10);

    doc.autoTable({
      head: [['ID', 'Name', 'Email', 'Position', 'Phone', 'Address']],
      body: staffs.map(staff => [staff.EMPID, staff.name, staff.email, staff.position, staff.phone, staff.address]),
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

    doc.save('staff-details.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchstaffs().then(data => {
        setstaffs(data);
        setNoResults(false);
      }).catch(error => {
        console.error("Error fetching staffs:", error);
      });
      return;
    }

    const filteredstaffs = staffs.filter(staff =>
      Object.values(staff).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setstaffs(filteredstaffs);
    setNoResults(filteredstaffs.length === 0);
  };

  const handleAddstaff = () => {
    setShowAddstaffForm(true);
  };

  const handleBack = () => {
    setShowAddstaffForm(false);
  };

  return (
    <Box>
      {showAddstaffForm ? (
        <Box>
          <Addstaff onBack={handleBack} />
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
              onClick={handleAddstaff}
              sx={{ borderRadius: 2, marginLeft: 'auto' }}
              startIcon={<Add />}
            >
              Add staff
            </Button>
          </Box>

          <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
            <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noResults ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">No staff found.</TableCell>
                    </TableRow>
                  ) : (
                    staffs.map((staff) => (
                      <TableRow key={staff._id}>
                        <TableCell>{staff.EMPID}</TableCell>
                        <TableCell>{staff.name}</TableCell>
                        <TableCell>{staff.email}</TableCell>
                        <TableCell>{staff.position}</TableCell>
                        <TableCell>{staff.phone}</TableCell>
                        <TableCell>{staff.address}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(staff._id)} sx={{ color: 'primary.main' }}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => deletestaff(staff._id)} sx={{ color: 'error.main' }}>
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

export default staffDetails;
