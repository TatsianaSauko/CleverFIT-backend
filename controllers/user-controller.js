const userService = require("../services/user-service");

class UserController {
    async getUserData(request, response, next) {
        const gettingUserDataStatus = userService.module.getUserDataService(request.user.id);

        if(gettingUserDataStatus.statusCode === 200) {
            return response
                .status(gettingUserDataStatus.statusCode)
                .json(gettingUserDataStatus.data);
        }

        response
            .status(feedbackActionStatus.statusCode)
            .json(feedbackActionStatus);


    }

    async changePassword(request, response, next) {
        const { password, confirmPassword } = request.body;
        const emailVerified = request.cookies.emailVerified;
        const userEmail = request.cookies.userEmail;
    
        if (!emailVerified) {
            return response
                .status(400)
                .json({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'Email не подтвержден'
                });
        }
    
        if (password !== confirmPassword) {
            return response
                .status(400)
                .json({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'Пароли не совпадают'
                });
        }
    
        const changingPasswordStatus = userService.module.changePasswordService(password, userEmail);

        response
            .status(changingPasswordStatus.statusCode)
            .json(changingPasswordStatus);
    }

    async updateUserData(request, response, next) {
        const { email, password, firstName, lastName, birthday, imgSrc, readyForJointTraining, sendNotification } = request.body;

        const updateData = {
            email,
            firstName,
            lastName,
            birthday,
            imgSrc,
            readyForJointTraining,
            sendNotification,
        };

        const updatingUserDataStatus = userService.module.updateUserDataService(updateData, password, request.user.id);

        if(updatingUserDataStatus.statusCode === 200) {
            return response
                .status(updatingUserDataStatus.statusCode)
                .json(updatingUserDataStatus.data);
        }

        response
            .status(updatingUserDataStatus.statusCode)
            .json(updatingUserDataStatus);
    }
}

module.exports = new UserController();