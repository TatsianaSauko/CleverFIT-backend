const { StatusCodes } = require('http-status-codes');

const { ErrorHandler } = require('../common/error');
const { ERRORS } = require('../common/constants');

const { toResponse } = require('../models/invite');

const inviteService = require('../services/invite-service');
const userService = require('../services/user-service');
const trainingService = require('../services/training-service');

class InviteController {

  async getAllInvites(req, res, next) { 
    const invites = await inviteService.module.getAllInvites(req.user.id);
    if (!createInvite) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, ERRORS.BAD_REQUEST);
    }  
    return res.status(getAllInvites.statusCode).json(invites.map(toResponse));
  }

  async createInvite(req, res, next) {  
    const { to, trainingId } = req.body;        
    // Проверка наличия обязательных полей
    if (!to || !trainingId) {           
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, ERRORS.INVITE_FIELD_REQUIRE);  
    }
    const createInvite = await inviteService.module.createInvite(to, trainingId, req.user.id);
    // Проверка результата
    if (!createInvite) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, ERRORS.BAD_REQUEST);
    }
    return res.status(createInvite.statusCode).send(createInvite);
  }
}
module.exports = new InviteController();