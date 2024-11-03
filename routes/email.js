const express = require('express');
const router = express.Router();

const EmailController = require('../controllers/email-controller');

// Маршрут для проверки email и отправки временного кода
router.post('/check-email', EmailController.checkEmail);

// Маршрут для подтверждения email и проверки временного кода
router.post('/confirm-email', EmailController.confirmEmail);

module.exports = router;