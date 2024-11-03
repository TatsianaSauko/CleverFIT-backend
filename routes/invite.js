const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
const { Invite, toResponse } = require('../models/invite');
const authenticateToken = require('../middleware/authenticateToken');
const InviteService = require('../services/invite');
const { ErrorHandler, catchErrors } = require("../common/error")
// const { ERRORS, MESSAGES } = require('../../common/constants');

  router
  .route('/')
  .get(authenticateToken, catchErrors(async (req, res) => {
      const invites = await InviteService.getAll();
      res.json(invites.map(toResponse));
  }))
  .post(authenticateToken, catchErrors(async (req, res) => {
      const { toUserId, trainingId } = req.body;

      // Проверка наличия обязательных полей
      if (!toUserId || !trainingId) {
        return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Поля toUserId и trainingId обязательны!' });
      }
      const invite = await InviteService.add(new Invite({
          toUserId,
          trainingId
      }));
      res.status(StatusCodes.CREATED).send(toResponse(invite));
  }));

// router
//   .route('/:inviteId')
//   .get(authenticateToken, catchErrors(async (req, res) => {
//       const invite = await inviteService.get(req.params.inviteId);
//       if (!invite) {
//         throw new ErrorHandler(StatusCodes.NOT_FOUND, ERRORS.INVITE_NOT_FOUND);
//       }
//       res.status(StatusCodes.OK).send(toResponse(invite));
//     }))
//   .put(authenticateToken, catchErrors(async (req, res) => {
//       const inviteUpdate = await inviteService.update(
//         req.params.inviteId,
//         req.body
//       );
//       if (!inviteUpdate) {
//         throw new ErrorHandler(StatusCodes.BAD_REQUEST, getStatusText(BAD_REQUEST));
//       }
//       res.status(StatusCodes.OK).send(toResponse(inviteUpdate));
//     }))
//   .delete(authenticateToken, catchErrors(async (req, res) => {
//       const invite = await inviteService.remove(req.params.inviteId);
//       if (!invite) {
//         throw new ErrorHandler(StatusCodes.NOT_FOUND, ERRORS.INVITE_NOT_FOUND);
//       }
//       res.status(204).send(MESSAGES.DELETE_INVITE_SUCCESSFULL_MESSAGE);
//     }));

module.exports = router;