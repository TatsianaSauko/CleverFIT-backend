const { StatusCodes } = require('http-status-codes');

const trainingService = require('../services/training-service');

class TrainingController {
    // GET /training - Получение всех персональных тренировок
    async getTrainingData(request, response, next) {
        const gettingTrainingDataStatus = trainingService.module.gettingTrainingDataService(request.user.id);

        if(gettingTrainingDataStatus.statusCode === StatusCodes.OK) {
            return response
                .status(gettingTrainingDataStatus.statusCode)
                .json(gettingTrainingDataStatus.data);
        }

        response
            .status(gettingTrainingDataStatus.statusCode)
            .json(gettingTrainingDataStatus);
    }

    async sendTrainingData(request, response, next) {
        const { name, date, exercises, parameters, isImplementation } = request.body;

        const sendingTrainingDataStatus = trainingService.module.sendingTrainingDataService(name, date, exercises, parameters, request.user.id, isImplementation);

        if(sendingTrainingDataStatus.statusCode === StatusCodes.OK) {
            return response
                .status(sendingTrainingDataStatus.statusCode)
                .json(sendingTrainingDataStatus.data);
        }

        response
            .status(sendingTrainingDataStatus.statusCode)
            .json(sendingTrainingDataStatus);
    }
}

module.exports = new TrainingController();