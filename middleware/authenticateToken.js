const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Загрузка переменных окружения из .env файла
dotenv.config();

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            statusCode: StatusCodes.UNAUTHORIZED,
            error: 'Unauthorized',
            message: 'Токен не предоставлен'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Использование переменной окружения
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Ошибка проверки токена:', err);
        return res.status(StatusCodes.UNAUTHORIZED).json({
            statusCode: StatusCodes.UNAUTHORIZED,
            error: 'Unauthorized',
            message: 'Неверный токен'
        });
    }
};
