const dotenv = require('dotenv');
dotenv.config();

const trainingList = require("../helpers/catalog");

class CatalogService {
    async getTrainingListService(authorizationHeaderString) {
        try {
            // Проверка наличия авторизационного заголовка
            if (!authorizationHeaderString) {
                return {
                    statusCode: 403,
                    error: 'Forbidden',
                    message: 'Отсутствует заголовок Authorization или токен не действителен.',
                };
            }

            return {
                statusCode: 200,
                trainingList: trainingList
            }
    
        } catch (error) {
            console.error('Ошибка при получении списка тренировок:', error);

            return {
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'Ошибка сервера.',
            };
        }
    }

}

exports.module = new CatalogService(); 