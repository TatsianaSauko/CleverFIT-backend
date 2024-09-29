const jwt = require('jsonwebtoken');

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
        const decoded = jwt.verify(token, 'your-secret-key');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            statusCode: 401,
            error: 'Unauthorized',
            message: 'Неверный токен'
        });
    }
};

