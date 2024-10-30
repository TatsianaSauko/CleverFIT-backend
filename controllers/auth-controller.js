const authService = require("../services/auth-service");

class AuthController {
    async registration(request, response, next) {
        const { email, password } = request.body;

        const registrationStatus = await authService.module.registrationService(email, password);

        response
            .status(registrationStatus.statusCode)
            .json(registrationStatus);
    }

    async login(request, response, next) {
        const { email, password } = request.body;

        const registrationStatus = await authService.module.loginService(email, password);

        if(registrationStatus.statusCode === 200) {
            return response
                .status(registrationStatus.statusCode)
                .json(registrationStatus.accessToken);
        }

        response
            .status(registrationStatus.statusCode)
            .json(registrationStatus);
    }
}

module.exports = new AuthController();