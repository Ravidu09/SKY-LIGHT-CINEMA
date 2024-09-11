const Promotion = require('../Model/PromotionModel');

// Generate promotion ID with leading zeros
const generatePromotionID = async () => {
    const lastPromotion = await Promotion.findOne().sort({ promotionID: -1 }).limit(1);
    const lastId = lastPromotion ? parseInt(lastPromotion.promotionID.replace('PR', ''), 10) : 0;
    const newId = `PR${(lastId + 1).toString().padStart(3, '0')}`; // Adjust padding as needed
    return newId;
};

// Create a new promotion record
exports.createPromotion = async (req, res) => {
    try {
        const { title, description, discount, startDate, endDate } = req.body;

        const promotionID = await generatePromotionID(); // Generate new promotion ID
        const newPromotion = new Promotion({ promotionID, title, description, discount, startDate, endDate });
        await newPromotion.save();

        res.status(201).json({ message: 'Promotion record created successfully', promotion: newPromotion });
    } catch (error) {
        res.status(500).json({ message: 'Error creating promotion record', error: error.message });
    }
};

// Get all promotion records
exports.getAllPromotions = async (req, res) => {
    try {
        const promotions = await Promotion.find();
        res.status(200).json(promotions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving promotion records', error: error.message });
    }
};

// Get a promotion record by ID
exports.getPromotionById = async (req, res) => {
    try {
        const promotion = await Promotion.findById(req.params.id);
        if (!promotion) {
            return res.status(404).json({ message: 'Promotion record not found' });
        }
        res.status(200).json(promotion);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving promotion record', error: error.message });
    }
};

// Update a promotion record by ID
exports.updatePromotion = async (req, res) => {
    try {
        const { title, description, discount, startDate, endDate } = req.body;

        const updatedPromotion = await Promotion.findByIdAndUpdate(
            req.params.id,
            { title, description, discount, startDate, endDate },
            { new: true } // Return the updated promotion record
        );

        if (!updatedPromotion) {
            return res.status(404).json({ message: 'Promotion record not found' });
        }

        res.status(200).json({ message: 'Promotion record updated successfully', promotion: updatedPromotion });
    } catch (error) {
        res.status(500).json({ message: 'Error updating promotion record', error: error.message });
    }
};

// Delete a promotion record by ID
exports.deletePromotion = async (req, res) => {
    try {
        const deletedPromotion = await Promotion.findByIdAndDelete(req.params.id);
        if (!deletedPromotion) {
            return res.status(404).json({ message: 'Promotion record not found' });
        }

        res.status(200).json({ message: 'Promotion record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting promotion record', error: error.message });
    }
};
