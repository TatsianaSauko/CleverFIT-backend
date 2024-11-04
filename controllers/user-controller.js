const { StatusCodes } = require('http-status-codes');

const userService = require('../services/user-service');

class UserController {
    async getUserData(request, response, next) {
        const gettingUserDataStatus = userService.module.getUserDataService(request.user.id);

        if(gettingUserDataStatus.statusCode === StatusCodes.OK) {
            return response
                .status(gettingUserDataStatus.statusCode)
                .json(gettingUserDataStatus.data);
        }

        response
            .status(gettingUserDataStatus.statusCode)
            .json(gettingUserDataStatus);

    }

    async changePassword(request, response, next) {
        const { password, confirmPassword } = request.body;
        const { emailVerified } = request.cookies;
        const { userEmail } = request.cookies;

        if (!emailVerified) {
            return response
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    statusCode: StatusCodes.BAD_REQUEST,
                    error: 'Bad Request',
                    message: 'Email не подтвержден'
                });
        }

        if (password !== confirmPassword) {
            return response
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    statusCode: StatusCodes.BAD_REQUEST,
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

        if(updatingUserDataStatus.statusCode === StatusCodes.OK) {
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