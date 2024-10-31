const feedbackService = require("../services/feedback-service");

class FeedbackController {
    async feedbackAction(request, response, next) {
        const { message, rating } = req.body;
        const userId = request.user.id; // Assuming the user ID is available in the token

        const feedbackActionStatus = feedbackService.module.feedbackActionService(message, rating, userId);

        if(feedbackActionStatus.statusCode === 201) {
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

        if(gettingFeedbackStatus.statusCode === 200) {
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