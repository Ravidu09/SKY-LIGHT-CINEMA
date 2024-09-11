const Maintanance = require('../Model/MaintananceModel');

// Generate maintenance ID with leading zeros
const generateMaintananceID = async () => {
    const lastMaintanance = await Maintanance.findOne().sort({ maintananceID: -1 }).limit(1);
    const lastId = lastMaintanance ? parseInt(lastMaintanance.maintananceID.replace('M', ''), 10) : 0;
    const newId = `M${(lastId + 1).toString().padStart(3, '0')}`; // Adjust padding as needed
    return newId;
};

// Create a new maintenance record
exports.createMaintanance = async (req, res) => {
    try {
        const { description, date, cost, staffID } = req.body;

        const maintananceID = await generateMaintananceID(); // Generate new maintenance ID
        const newMaintanance = new Maintanance({ maintananceID, description, date, cost, staffID });
        await newMaintanance.save();

        res.status(201).json({ message: 'Maintenance record created successfully', maintanance: newMaintanance });
    } catch (error) {
        res.status(500).json({ message: 'Error creating maintenance record', error: error.message });
    }
};

// Get all maintenance records
exports.getAllMaintanances = async (req, res) => {
    try {
        const maintanances = await Maintanance.find();
        res.status(200).json(maintanances);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving maintenance records', error: error.message });
    }
};

// Get a maintenance record by ID
exports.getMaintananceById = async (req, res) => {
    try {
        const maintanance = await Maintanance.findById(req.params.id);
        if (!maintanance) {
            return res.status(404).json({ message: 'Maintenance record not found' });
        }
        res.status(200).json(maintanance);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving maintenance record', error: error.message });
    }
};

// Update a maintenance record by ID
exports.updateMaintanance = async (req, res) => {
    try {
        const { description, date, cost, staffID } = req.body;

        const updatedMaintanance = await Maintanance.findByIdAndUpdate(
            req.params.id,
            { description, date, cost, staffID },
            { new: true } // Return the updated maintenance record
        );

        if (!updatedMaintanance) {
            return res.status(404).json({ message: 'Maintenance record not found' });
        }

        res.status(200).json({ message: 'Maintenance record updated successfully', maintanance: updatedMaintanance });
    } catch (error) {
        res.status(500).json({ message: 'Error updating maintenance record', error: error.message });
    }
};

// Delete a maintenance record by ID
exports.deleteMaintanance = async (req, res) => {
    try {
        const deletedMaintanance = await Maintanance.findByIdAndDelete(req.params.id);
        if (!deletedMaintanance) {
            return res.status(404).json({ message: 'Maintenance record not found' });
        }

        res.status(200).json({ message: 'Maintenance record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting maintenance record', error: error.message });
    }
};
