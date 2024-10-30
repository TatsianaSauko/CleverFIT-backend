const rateLimit = require('express-rate-limit');

// Массив со списком тренировок
const trainingList = [
    { name: 'Ноги', key: 'legs' },
    { name: 'Руки', key: 'hands' },
    { name: 'Силовая', key: 'strength' },
    { name: 'Спина', key: 'back' },
    { name: 'Грудь', key: 'chest' },
];

// Лимит запросов
const catalogLimiter = rateLimit({
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

module.exports = trainingList, catalogLimiter; 