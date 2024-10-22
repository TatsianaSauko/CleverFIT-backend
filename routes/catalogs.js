const express = require('express');
const rateLimit = require('express-rate-limit');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

// Массив со списком тренировок
const trainingList = [
    { name: 'Ноги', key: 'legs' },
    { name: 'Руки', key: 'hands' },
    { name: 'Силовая', key: 'strength' },
    { name: 'Спина', key: 'back' },
    { name: 'Грудь', key: 'chest' },
];

// Лимит запросов
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 минута
    max: 200, // Лимит запросов
    handler: (req, res) => {
        return res.status(429).json({
            statusCode: 429,
            error: 'Too Many Requests',
            message: 'Превышено максимальное количество запросов в минуту.',
        });
    }
});

// GET /catalogs/training-list - Получение списка тренировок
router.get('/training-list', authenticateToken, limiter, (req, res) => {
    try {
        // Проверка наличия авторизационного заголовка
        if (!req.headers.authorization) {
            return res.status(403).json({
                statusCode: 403,
                error: 'Forbidden',
                message: 'Отсутствует заголовок Authorization или токен не действителен.',
            });
        }

        res.status(200).json(trainingList);
    } catch (error) {
        console.error('Ошибка при получении списка тренировок:', error);
        res.status(500).json({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ошибка сервера.',
        });
    }
});

// Обработка неверных запросов (ошибка 400)
router.use((req, res) => {
    res.status(400).json({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Ошибка в запросе. Проверьте параметры и данные.',
    });
});

module.exports = router;
