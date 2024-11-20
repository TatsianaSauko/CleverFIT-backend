const { StatusCodes } = require('http-status-codes');
const { Invite } = require('../models/invite');

const INVITE_STATUS = require('../common/constants');

const userService = require('../services/user-service');
const trainingService = require('../services/training-service');

class InviteService {

    async getAllInvites(userId) {
        const invites = await Invite.find({ from: userId }).exec();
        // TODO map result
        if(!invites) {
            return {
                statusCode: StatusCodes.OK,
                data: invites
            }
        }
        const invitesFullData = await Promise.all(invites.map(async item => { 
            const prepareData = [];
            prepareData.push(await this.prepareResponseData(item));
            return prepareData;
        }));

        return {
            statusCode: StatusCodes.OK,
            data: invitesFullData
        }
    }

    async createInvite(to, trainingId, from) {     
        const newInvite = new Invite({
            from,
            to,
            trainingId,
            status: INVITE_STATUS.PENDING,
            createdAt: new Date()
        });
        const createInvite = await newInvite.save();
        // TODO map result
        if (!createInvite) {
            return {
                statusCode: StatusCodes.CREATED,
                data: createInvite 
            };
        }
            const createInviteFullData = await this.prepareResponseData(createInvite);
        return {
            statusCode: StatusCodes.CREATED,
            data: createInviteFullData 
        };
    }

    async prepareResponseData({ _id, from, to, trainingId, status, createdAt }) {
    
        const userTo = await userService.module.getUserDataService(to);
        const userFrom = await userService.module.getUserDataService(from);
        const training = (await trainingService.module.gettingTrainingDataService(from)).data;
        
        const trainingFiltered = training.filter(item => item._id = trainingId);
        
        return {
                _id: _id,
                from: userFrom.data,
                training: trainingFiltered,
                status: status,
                createdAt: createdAt,
                to: userTo.data
        }
    }
    
}

exports.module = new InviteService();