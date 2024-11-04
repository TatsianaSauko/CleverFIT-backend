const { StatusCodes } = require('http-status-codes');

const feedbackService = require('../services/feedback-service');

class FeedbackController {
    async feedbackAction(request, response, next) {
        const { message, rating } = request.body;
        const userId = request.user.id; // Assuming the user ID is available in the token

        const feedbackActionStatus = feedbackService.module.feedbackActionService(message, rating, userId);

        if(feedbackActionStatus.statusCode === StatusCodes.CREATED) {
            return response
                .status(feedbackActionStatus.statusCode)
                .json(feedbackActionStatus.data);
        }

        response
            .status(feedbackActionStatus.statusCode)
            .json(feedbackActionStatus);

    }

    async getFeedback(request, response, next) {
        const gettingFeedbackStatus = feedbackService.module.getFeedbackService();

        if(gettingFeedbackStatus.statusCode === StatusCodes.OK) {
            return response
                .status(gettingFeedbackStatus.statusCode)
                .json(gettingFeedbackStatus.data);
        }

        response
            .status(gettingFeedbackStatus.statusCode)
            .json(gettingFeedbackStatus);
    }
}

module.exports = new FeedbackController();