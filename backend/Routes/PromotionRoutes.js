const express = require('express');
const router = express.Router();
const PromotionController = require('../Controllers/PromotionController');

// Routes for Promotion operations
router.post('/Promotion', PromotionController.createPromotion);
router.get('/Promotion', PromotionController.getAllPromotions);
router.get('/Promotion:id', PromotionController.getPromotionById);
router.put('/Promotion:id', PromotionController.updatePromotion);
router.delete('/Promotion:id', PromotionController.deletePromotion);

module.exports = router;
