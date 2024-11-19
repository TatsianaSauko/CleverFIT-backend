const { StatusCodes } = require('http-status-codes');
const { ErrorHandler } = require('../common/error');
const { Invite } = require('../models/invite');

class InviteService {

    async getAllInvites(userId) {
        const invites = await Invite.find({ userId: userId });
        // TODO map result
        return {
            statusCode: StatusCodes.OK,
            data: invites
        }
    }

    async createInvite(to, trainingId, from) {     
        const newInvite = new Invite({
            from,
            to,
            trainingId,
            createdAt: new Date()
        });
        const createInvite = await newInvite.save();
        // TODO map result
        // const createInviteFullData = {

        // }
        return {
            statusCode: StatusCodes.CREATED,
            data: createInvite
            // data: createInviteFullData 
        };
    }
}

exports.module = new InviteService();