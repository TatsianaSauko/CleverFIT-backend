const catalogService = require("../services/auth-service");

class CatalogController {
    // GET /catalogs/training-list - Получение списка тренировок
    async getTrainingList(request, response, next) {
        const gettingTrainingListStatus = await catalogService.module.getTrainingListService(request.headers.authorization);

        if(gettingTrainingListStatus.statusCode === 200) {
            return response
                .status(gettingTrainingListStatus.statusCode)
                .json(gettingTrainingListStatus);
        }

        response
            .status(registrationStatus.statusCode)
            .json(registrationStatus);
    }
}

module.exports = new CatalogController();