import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Box, Toolbar, Typography } from '@mui/material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import BusinessIcon from '@mui/icons-material/Business';
import EventIcon from '@mui/icons-material/Event';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const drawerWidth = 240;

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [currentTab, setCurrentTab] = useState('Dashboard'); // Set default value

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admindashboard' },
    { text: 'User Management', icon: <PeopleIcon />, path: '/admindashboard/user-management' },
    { text: 'Movie Management', icon: <AssignmentIcon />, path: '/admindashboard/movie-management' },
    { text: 'Payment Management', icon: <InventoryIcon />, path: '/admindashboard/payment-management' },
    { text: 'Staff Management', icon: <PeopleIcon />, path: '/admindashboard/staff-management' },
    { text: 'Maintenance Management', icon: <BusinessIcon />, path: '/admindashboard/maintenance-management' },
    { text: 'Booking Management', icon: <EventIcon />, path: '/admindashboard/booking-management' },
    { text: 'Promotion Management', icon: <ShoppingCartIcon />, path: '/admindashboard/promotion-management' },
    { text: 'Feedback Management', icon: <FeedbackIcon />, path: '/admindashboard/feedback-management' },
    { text: 'Support Management', icon: <SupportAgentIcon />, path: '/admindashboard/support-management' },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find(item => item.path === currentPath);
    if (currentItem) {
      setCurrentTab(currentItem.text);
    } else {
      setCurrentTab('Dashboard'); // Default tab if no match
    }
  }, [location.pathname]);

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Clear any session or authentication data here if applicable
    navigate('/'); // Redirect to home page
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
            backgroundColor: '#000', // Black
            color: '#fff', // White text
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              selected={location.pathname === item.path} // Highlight active item
              onClick={() => handleMenuClick(item.path)}
              sx={{ 
                '&.Mui-selected': { 
                  backgroundColor: '#f00', // Red for selected item
                  color: '#fff', // White text
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          {/* Logout Button */}
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#d3d3d3', // Light gray background for main content
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Typography variant="h5" sx={{ marginBottom: 2, color: '#f00' }}>
          {currentTab}
        </Typography>
        <Outlet /> {/* Render nested routes */}
      </Box>
    </Box>
  );
}

export default AdminDashboard;
