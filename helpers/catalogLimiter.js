const { StatusCodes } = require('http-status-codes');
const rateLimit = require('express-rate-limit');

// Лимит запросов
const catalogLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 минута
    max: 200, // Лимит запросов
    handler: (req, res) => {
        return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
            statusCode: StatusCodes.TOO_MANY_REQUESTS,
            error: 'Too Many Requests',
            message: 'Превышено максимальное количество запросов в минуту.',
        });
    }
});

module.exports = catalogLimiter;