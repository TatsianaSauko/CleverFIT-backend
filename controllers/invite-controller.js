const { StatusCodes } = require('http-status-codes');

const inviteService = require('../services/invite-service');

class InviteController {

  async getAll(req, res, next) { 
      const getAllInvite = inviteService.module.getAll(req.user.id);
      
      if(getAllInvite.statusCode === StatusCodes.OK) {
          return res
              .status(getAllInvite.statusCode)
              .send(toResponse(getAllInvite.data));
      }
      res
          .status(getAllInvite.statusCode)
          .json(getAllInvite);

  }

  async create(req, res, next) {
      const { to, trainingId } = req.body;

      const createInvite = inviteService.module.create(to, trainingId, req.user.id);
      
      if(createInvite.statusCode === StatusCodes.OK) {
          return res
              .status(createInvite.statusCode)
              .send(toResponse(createInvite.data));
      }

      res
          .status(createInvite.statusCode)
          .json(createInvite);
  }

}
module.exports = new InviteController();