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
    // // Маршрут для проверки email и отправки временного кода
    // async checkEmail(request, response, next) {
    //     const { email } = request.body;

    //     const checkEmailStatus =  emailService.module.checkEmailService(email);

    //     response
    //         .status(checkEmailStatus.statusCode)
    //         .json(checkEmailStatus);
    // }

    // async confirmEmail(request, response, next) {
    //     const { email, code } = request.body;

    //     const confirmEmailStatus =  emailService.module.confirmEmailService(email, code);

    //     if(confirmEmailStatus.statusCode === 200) {
    //         response.cookie('emailVerified', true, { httpOnly: true });
    //         response.cookie('userEmail', email, { httpOnly: true });

    //         return response
    //             .status(confirmEmailStatus.statusCode)
    //             .json(confirmEmailStatus);
    //     }

    //     response
    //         .status(confirmEmailStatus.statusCode)
    //         .json(confirmEmailStatus);
    // }
}

module.exports = new FeedbackController();