const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

// Import routes
const userRoutes = require('./Routes/UserRoutes');
const jewelleryRoutes = require('./Routes/JewelleryRoutes');
const customerRoutes = require('./Routes/CustomerRoutes');
const feedbackRoutes = require('./Routes/FeedbackRoutes');
const employeeRoutes = require('./Routes/EmployeeRoutes');
const salaryRoutes = require('./Routes/SalaryRoutes');
const supplierRoutes = require('./Routes/SupplierRoutes');
const inventoryRoutes = require('./Routes/InventoryRoutes');

// Middleware
app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/jewellery', jewelleryRoutes);
app.use('/customers', customerRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/employees', employeeRoutes);
app.use('/salaries', salaryRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/inventory', inventoryRoutes);

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = 4000;
const DB_URL = 'mongodb+srv://TBMS:TBMS@tbms.sac1w.mongodb.net/';

// Connect to MongoDB
mongoose.connect(DB_URL)
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => console.log('DB connection error', err));

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}!`);
});
