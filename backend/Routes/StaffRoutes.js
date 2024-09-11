const express = require('express');
const router = express.Router();
const StaffController = require('../Controllers/StaffController');  // Make sure this path is correct

// Define routes for staff operations
router.post('/staff', StaffController.createStaff);
router.get('/staff', StaffController.getStaff);
router.get('/staff:id', StaffController.getStaffById);
router.put('/staff:id', StaffController.updateStaff);
router.delete('/staff:id', StaffController.deleteStaff);

module.exports = router;
