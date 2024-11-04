const { StatusCodes } = require('http-status-codes');

const trainingList = require('../helpers/catalogHelpers');

class CatalogService {
    async getTrainingListService(authorizationHeaderString) {
        try {
            // Проверка наличия авторизационного заголовка
            if (!authorizationHeaderString) {
                return {
                    statusCode: StatusCodes.FORBIDDEN,
                    error: 'Forbidden',
                    message: 'Отсутствует заголовок Authorization или токен не действителен.',
                };
            }

            return {
                statusCode: StatusCodes.OK,
                trainingList: trainingList
            }

        } catch (error) {
            console.error('Ошибка при получении списка тренировок:', error);

            return {
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error',
                message: 'Ошибка сервера.',
            };
        }
    }

}

exports.module = new CatalogService();