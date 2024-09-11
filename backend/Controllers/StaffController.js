const Staff = require('../Model/StaffModel'); // Adjust the path if necessary

// Generate staff ID with leading zeros
const generateStaffId = async () => {
    const lastStaff = await Staff.findOne().sort({ STAFFID: -1 }).limit(1);
    const lastId = lastStaff ? parseInt(lastStaff.STAFFID.replace('S', ''), 10) : 0;
    const newId = `S${(lastId + 1).toString().padStart(3, '0')}`; // Adjust padding as needed
    return newId;
};

// Create a new staff member
exports.createStaff = async (req, res) => {
    try {
        const { name, email, position, phone, address } = req.body;

        const STAFFID = await generateStaffId(); // Generate new staff ID
        const newStaff = new Staff({ STAFFID, name, email, position, phone, address });
        await newStaff.save();

        res.status(201).json({ message: 'Staff member created successfully', staff: newStaff });
    } catch (error) {
        res.status(500).json({ message: 'Error creating staff member', error: error.message });
    }
};

// Get all staff members
exports.getStaff = async (req, res) => {
    try {
        const staff = await Staff.find();
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving staff members', error: error.message });
    }
};

// Get a staff member by ID
exports.getStaffById = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        if (staff) {
            res.status(200).json(staff);
        } else {
            res.status(404).json({ message: 'Staff member not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving staff member', error: error.message });
    }
};

// Update a staff member by ID
exports.updateStaff = async (req, res) => {
    try {
        const { name, email, position, phone, address } = req.body;
        const updatedStaff = await Staff.findByIdAndUpdate(
            req.params.id,
            { name, email, position, phone, address },
            { new: true } // Return the updated staff member
        );

        if (updatedStaff) {
            res.status(200).json({ message: 'Staff member updated successfully', staff: updatedStaff });
        } else {
            res.status(404).json({ message: 'Staff member not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating staff member', error: error.message });
    }
};

// Delete a staff member by ID
exports.deleteStaff = async (req, res) => {
    try {
        const deletedStaff = await Staff.findByIdAndDelete(req.params.id);
        if (deletedStaff) {
            res.status(200).json({ message: 'Staff member deleted successfully' });
        } else {
            res.status(404).json({ message: 'Staff member not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting staff member', error: error.message });
    }
};
