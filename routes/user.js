const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const UserController = require('../controllers/user-controller');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/me', authenticateToken, UserController.getUserData);

// Маршрут для изменения пароля
router.post('/change-password', UserController.changePassword);

// Маршрут для обновления данных пользователя
router.put('/', authenticateToken, UserController.updateUserData);

module.exports = router;
