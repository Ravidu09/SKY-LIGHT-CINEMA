const express = require('express');
const router = express.Router();
const PromotionController = require('../Controllers/PromotionController');

router.post('/', PromotionController.createPromotion);
router.get('/', PromotionController.getPromotions);
router.get('/:id', PromotionController.getPromotionById);
router.put('/:id', PromotionController.updatePromotion);
router.delete('/:id', PromotionController.deletePromotion);

module.exports = router;