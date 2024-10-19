const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const authenticateToken = require('../middleware/authenticateToken');

// Настройка хранилища для multer
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Маршрут для загрузки изображения
router.post('/', authenticateToken, upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Файл не был загружен'
        });
    }
	
    const imgUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    try {
        // Обновляем пользователя, чтобы сохранить путь к изображению
        const user = await User.findByIdAndUpdate(req.user.id, { imgSrc: imgUrl }, { new: true });

        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                error: 'Not Found',
                message: 'Пользователь не найден'
            });
        }

        res.status(200).json({
            name: req.file.filename,
            url: imgUrl,
        });
    } catch (error) {
        console.error('Ошибка обновления изображения:', error);
        res.status(500).json({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ошибка сервера'
        });
    }
});

module.exports = router;
