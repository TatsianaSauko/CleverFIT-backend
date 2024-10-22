const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const Training = require('../models/training');
const router = express.Router();

// GET /training - Получение всех персональных тренировок
router.get('/', authenticateToken, async (req, res) => {
    try {
        // Ищем все тренировки, которые принадлежат текущему авторизованному пользователю
        const trainings = await Training.find({ userId: req.user.id });
        
        res.status(200).json(trainings);
    } catch (error) {
        console.error('Ошибка при получении тренировок:', error);
        res.status(500).json({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ошибка сервера',
        });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { name, date, exercises, parameters } = req.body;

        // Проверка обязательных полей
        if (!name || !date || !exercises || exercises.length === 0) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Bad Request',
                message: 'Обязательные поля: name, date, exercises',
            });
        }

        // Создаем объект тренировки
        const newTraining = new Training({
            name,
            date,
            isImplementation: req.body.isImplementation || false,
            parameters: {
                repeat: parameters?.repeat || false,
                period: parameters?.period || 7,
                jointTraining: parameters?.jointTraining || false,
                participants: parameters?.participants || [],
            },
            exercises: exercises.map(ex => ({
                name: ex.name,
                replays: ex.replays || 0,
                weight: ex.weight || 0,
                approaches: ex.approaches || 0,
                isImplementation: ex.isImplementation || false,
            })),
            userId: req.user.id, // связываем тренировку с пользователем
        });

        // Сохранение тренировки в базе данных
        const savedTraining = await newTraining.save();

        res.status(200).json(savedTraining);
    } catch (error) {
        console.error('Ошибка при создании тренировки:', error);

        if (error.code === 11000) { // Обработка конфликта данных
            return res.status(409).json({
                statusCode: 409,
                error: 'Conflict',
                message: 'Конфликт данных, такая тренировка уже существует',
            });
        }

        res.status(500).json({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ошибка сервера',
        });
    }
});

module.exports = router;
