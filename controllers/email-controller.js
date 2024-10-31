const emailService = require("../services/email-service");

class EmailController {
    // Маршрут для проверки email и отправки временного кода
    async checkEmail(request, response, next) {
        const { email } = request.body;

        const checkEmailStatus =  emailService.module.checkEmailService(email);

        response
            .status(checkEmailStatus.statusCode)
            .json(checkEmailStatus);
    }

    async confirmEmail(request, response, next) {
        const { email, code } = request.body;

        const confirmEmailStatus =  emailService.module.confirmEmailService(email, code);

        if(confirmEmailStatus.statusCode === 200) {
            response.cookie('emailVerified', true, { httpOnly: true });
            response.cookie('userEmail', email, { httpOnly: true });

            return response
                .status(confirmEmailStatus.statusCode)
                .json(confirmEmailStatus);
        }

        response
            .status(confirmEmailStatus.statusCode)
            .json(confirmEmailStatus);
    }
}

module.exports = new EmailController();