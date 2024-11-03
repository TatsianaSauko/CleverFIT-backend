const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth-controller');

// Маршрут для регистрации
router.post('/registration', AuthController.registration);

// Маршрут для авторизации
router.post('/login', AuthController.login);

module.exports = router;
