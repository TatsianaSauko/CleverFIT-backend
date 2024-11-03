const { StatusCodes } = require('http-status-codes');

const catalogService = require('../services/auth-service');

class CatalogController {
    // GET /catalogs/training-list - Получение списка тренировок
    async getTrainingList(request, response, next) {
        const gettingTrainingListStatus = await catalogService.module.getTrainingListService(request.headers.authorization);

        if(gettingTrainingListStatus.statusCode === StatusCodes.OK) {
            return response
                .status(gettingTrainingListStatus.statusCode)
                .json(gettingTrainingListStatus);
        }

        response
            .status(gettingTrainingListStatus.statusCode)
            .json(gettingTrainingListStatus);
    }
}

module.exports = new CatalogController();