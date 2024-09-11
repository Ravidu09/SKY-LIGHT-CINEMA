const express = require('express');
const router = express.Router();
const FeedbackController = require('../Controllers/FeedbackController');

// Routes
router.post('/', FeedbackController.createFeedback);
router.get('/Feedback', FeedbackController.getAllFeedbacks);
router.get('/Feedback:id', FeedbackController.getFeedbackById);
router.put('/Feedback:id', FeedbackController.updateFeedback);
router.delete('Feedback/:id', FeedbackController.deleteFeedback);

module.exports = router;
