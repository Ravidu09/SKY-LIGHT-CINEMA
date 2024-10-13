import React, { useState, useEffect, useContext } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Box, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PaidIcon from '@mui/icons-material/Paid';
import EngineeringIcon from '@mui/icons-material/Engineering';
import FeedbackIcon from '@mui/icons-material/Feedback';
import MovieIcon from '@mui/icons-material/Movie';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import BadgeIcon from '@mui/icons-material/Badge';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { AuthContext } from '../Auth/AuthContext'; // Import your AuthContext

const drawerWidth = 240;
const sidebarBackground = 'path_to_image'; // Replace with actual image URL or import statement

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext); // Access logout function from AuthContext

  const [currentTab, setCurrentTab] = useState('');
  const [showSupplierListButton, setShowSupplierListButton] = useState(false);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admindashboard' },
    { text: 'Payment Management', icon: <PaidIcon />, path: '/admindashboard/payment-management' },
    { text: 'User Management', icon: <PeopleIcon />, path: '/admindashboard/user-management' },
    { text: 'Movie Management', icon: <MovieIcon />, path: '/admindashboard/movie-management' },
    { text: 'Maintanance Management', icon: <EngineeringIcon />, path: '/admindashboard/inventory-management' },
    { text: 'Staff Management', icon: <BadgeIcon />, path: '/admindashboard/employee-details' },
    { text: 'Booking Management', icon: <ConfirmationNumberIcon />, path: '/admindashboard/booking-management' },
    { text: 'Promortion Management', icon: <LocalOfferIcon />, path: '/admindashboard/promotion-management' },
    { text: 'Feedback Management', icon: <FeedbackIcon />, path: '/admindashboard/feedback-management' },
    { text: 'Support Management', icon: <SupportAgentIcon />, path: '/admindashboard/support-management' },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find(item => item.path === currentPath);
    if (currentItem) {
      setCurrentTab(currentItem.text);
      setShowSupplierListButton(currentItem.text === 'Supplier Management');
    }
  }, [location.pathname]);

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSupplierListButtonClick = () => {
    navigate('/admindashboard/supplier-list-details'); // Navigate to the Supplier List page
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundImage: `url(${sidebarBackground})`, // Use the URL for the image
            backgroundSize: 'cover', // Adjust as needed
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ marginBottom: 0 }} /> {/* Remove margin */}
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={() => handleMenuClick(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: 'black' }} /> {/* Change text color to black */}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0, // No padding
          backgroundColor: '#f4f6f8',
          minHeight: '100vh',
          overflow: 'hidden', // Prevent scrolling
        }}
      >
        <Toolbar sx={{ margin: 0, padding: 0 }} /> {/* Set margin and padding to 0 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1976d2', padding: '10px 20px', color: 'white', height: '60px' }}>
          <Typography variant="h5">{currentTab}</Typography>
          <div>
            {showSupplierListButton && (
              <Button variant="contained" color="secondary" sx={{ marginLeft: 2 }} onClick={handleSupplierListButtonClick}>
                View Supplier List
              </Button>
            )}
            <Button variant="outlined" onClick={handleLogout} sx={{ marginLeft: 2, color: 'white', borderColor: 'white' }}>
               Logout
            </Button>
          </div>
        </Box>
        <Outlet /> {/* Render nested routes */}
      </Box>
    </Box>
  );
}

export default AdminDashboard;
