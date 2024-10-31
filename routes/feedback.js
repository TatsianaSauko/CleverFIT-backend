const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

const FeedbackController = require("../controllers/feedback-controller");

router.post('/', authenticateToken, FeedbackController.feedbackAction);
router.get('/', authenticateToken, FeedbackController.getFeedback);

module.exports = router;
