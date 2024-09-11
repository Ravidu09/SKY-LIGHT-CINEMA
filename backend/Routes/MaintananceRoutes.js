const express = require('express');
const router = express.Router();
const MaintananceController = require('../Controllers/MaintananceController');

// Routes for Maintenance operations
router.post('/Maintenance', MaintananceController.createMaintanance);       // Create a new maintenance record
router.get('/Maintenance', MaintananceController.getAllMaintanances);       // Get all maintenance records
router.get('/Maintenance:id', MaintananceController.getMaintananceById);    // Get a specific maintenance record by ID
router.put('/Maintenance:id', MaintananceController.updateMaintanance);     // Update a maintenance record by ID
router.delete('/Maintenance:id', MaintananceController.deleteMaintanance);  // Delete a maintenance record by ID

module.exports = router;
