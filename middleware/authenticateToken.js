const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Загрузка переменных окружения из .env файла
dotenv.config();

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            statusCode: 401,
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
        return res.status(401).json({
            statusCode: 401,
            error: 'Unauthorized',
            message: 'Неверный токен'
        });
    }
};
