const { StatusCodes } = require('http-status-codes');

const { ErrorHandler } = require('../common/error');
const { ERRORS } = require('../common/constants');

const inviteService = require('../services/invite-service');

class InviteController {

  async getAllInvites(req, res, next) { 
    const invites = await inviteService.module.getAllInvites(req.user.id);
    if (!invites) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, ERRORS.BAD_REQUEST);
    }  
    return res.status(StatusCodes.OK).send(invites);
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
    return res.status(StatusCodes.OK).send(createInvite);
  }

  async updateStatusInvite(req, res, next) {
    const { inviteId, status  } = req.body; 
    const updateInvite = await inviteService.module.updateStatusInvite(inviteId, status);
    // Проверка результата
    if (!updateInvite) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, ERRORS.BAD_REQUEST);
    }
    res.status(StatusCodes.OK).send(updateInvite);
  }
  
  async removeInvite(req, res, next) {
    const removeInvite = await inviteService.module.removeInvite(req.params.inviteId);
    // Проверка результата
    if (!removeInvite) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, ERRORS.INVITE_NOT_FOUND);
    }
    res.status(StatusCodes.NO_CONTENT).send({});
  }

}
module.exports = new InviteController();