const { StatusCodes } = require('http-status-codes');

const Training = require('../models/training');

class TrainingService {
    async gettingTrainingDataService(userID) {
        try {
            // Ищем все тренировки, которые принадлежат текущему авторизованному пользователю
            const trainings = await Training.find({ userId: userID });

            return {
                statusCode: StatusCodes.OK,
                data: trainings
            }
        } catch (error) {
            console.error('Ошибка при получении тренировок:', error);

            return {
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error',
                message: 'Ошибка сервера',
            };
        }
    }

    async sendingTrainingDataService(name, date, exercises, parameters, userID, isImplementation) {
        try {
            // Проверка обязательных полей
            if (!name || !date || !exercises || exercises.length === 0) {
                return {
                    statusCode: StatusCodes.BAD_REQUEST,
                    error: 'Bad Request',
                    message: 'Обязательные поля: name, date, exercises',
                };
            }

            const mockPeriodParameters = 7;

            // Создаем объект тренировки
            const newTraining = new Training({
                name,
                date,
                isImplementation: isImplementation || false,
                parameters: {
                    repeat: parameters?.repeat || false,
                    period: parameters?.period || mockPeriodParameters,
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
                userId: userID, // связываем тренировку с пользователем
            });

            // Сохранение тренировки в базе данных
            const savedTraining = await newTraining.save();

            return {
                statusCode: StatusCodes.OK,
                data: savedTraining
            }
        } catch (error) {
            console.error('Ошибка при создании тренировки:', error);

            if (error.code === 11000) { // Обработка конфликта данных
                return {
                    statusCode: StatusCodes.CONFLICT,
                    error: 'Conflict',
                    message: 'Конфликт данных, такая тренировка уже существует',
                };
            }

            return {
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error',
                message: 'Ошибка сервера',
            };
        }
    }
}

exports.module = new TrainingService();