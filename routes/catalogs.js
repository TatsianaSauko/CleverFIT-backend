const express = require('express');
const rateLimit = require('express-rate-limit');
const authenticateToken = require('../middleware/authenticateToken');
const { STATUS_CODES, ERRORS } = require('../common/constants');
const catalogService = require('../services/catalogService');
const router = express.Router();

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 минута
    max: 200, // Лимит запросов
    handler: (req, res) => {
        return res.status(STATUS_CODES.TOO_MANY_REQUESTS).json({
            statusCode: STATUS_CODES.TOO_MANY_REQUESTS,
            error: 'Too Many Requests',
            message: ERRORS.TOO_MANY_REQUESTS,
        });
    }
});

router.get('/training-list', authenticateToken, limiter, catalogService.getTrainingList);

router.get('/tariff-list', authenticateToken, limiter, catalogService.getTariffList);

router.use((req, res) => {
    res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: STATUS_CODES.BAD_REQUEST,
        error: 'Bad Request',
        message: ERRORS.BAD_REQUEST,
    });
});

module.exports = router;
