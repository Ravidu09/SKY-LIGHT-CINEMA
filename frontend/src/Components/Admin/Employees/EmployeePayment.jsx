import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddEmployee from './AddEmployee'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/employees";

const fetchEmployees = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function EmployeePayment() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees().then(data => {
      setEmployees(data);
    }).catch(error => {
      console.error("Error fetching employees:", error);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/admindashboard/update-employee/${id}`);
  };

  const deleteEmployee = async (employee) => {
    try {
      const response = await axios.delete(`${URL}/${employee._id}`);
      if (response.status === 200) {
        setEmployees(prev => prev.filter(emp => emp._id !== employee._id));
        alert(`Employee ${employee.EMPID} (${employee.name}) deleted successfully.`);
      }
    } catch (error) {
      console.error("Error deleting employee:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Employee Details Report", 10, 10);

    doc.autoTable({
      head: [['ID', 'Name', 'Email', 'Position', 'Phone', 'Address', 'Salary']],
      body: employees.map(employee => [employee.EMPID, employee.name, employee.email, employee.position, employee.phone, employee.address, employee.salary]),
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

    doc.save('employee-details.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchEmployees().then(data => {
        setEmployees(data);
        setNoResults(false);
      }).catch(error => {
        console.error("Error fetching employees:", error);
      });
      return;
    }

    const filteredEmployees = employees.filter(employee =>
      Object.values(employee).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setEmployees(filteredEmployees);
    setNoResults(filteredEmployees.length === 0);
  };

  const handleAddEmployee = () => {
    setShowAddEmployeeForm(true);
  };

  const handleBack = () => {
    setShowAddEmployeeForm(false);
  };

  const handleAddSalary = (id) => {
    navigate(`/admindashboard/add-salary/${id}`); // Redirect to Add Salary page
  };

  const handleSummaryReport = () => {
    navigate('/admindashboard/summary-report'); // Navigate to the Summary Report page
  };

  return (
    <Box
      
    >
      {showAddEmployeeForm ? (
        <Box>
          <AddEmployee onBack={handleBack} />
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            maxWidth: '1600px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Make the box slightly transparent
            borderRadius: 2,
            padding: 3,
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, alignItems: 'center', marginTop: 4 }}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                flexShrink: 1,
                width: '300px', // Increased width for the search bar
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
            
          </Box>

          <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
            <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Salary</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noResults ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">No employee found.</TableCell>
                    </TableRow>
                  ) : (
                    employees.map((employee) => (
                      <TableRow key={employee._id}>
                        <TableCell>{employee.EMPID}</TableCell>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.salary}</TableCell>
                        <TableCell>
                          
                          <Button
                            variant="contained"
                            color="info"
                            onClick={() => handleAddSalary(employee._id)} // Redirect to Add Salary
                            sx={{ marginLeft: 1 }}
                          >
                            Add Salary
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSummaryReport}>
              Summary Report
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default EmployeePayment;
