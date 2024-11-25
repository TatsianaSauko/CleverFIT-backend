const { StatusCodes } = require('http-status-codes');
const { Invite } = require('../models/invite');

const { INVITE_STATUS } = require('../common/constants');

const userService = require('../services/user-service');
const trainingService = require('../services/training-service');

class InviteService {

    async getAllInvites(userId) {
        const invites = await Invite.find({ from: userId }).exec();
        // Подготовка данных для ответа
        if(!invites) {
            return undefined;
        }
        const invitesFullData = await Promise.all(invites.map(async item => { 
            const prepareData = [];
            prepareData.push(await this.prepareResponseData(item));
            return prepareData;
        }));

        return invitesFullData !== null ? invitesFullData : undefined;
 
    }

    async createInvite(to, trainingId, from) {     
        const newInvite = new Invite({
            from,
            to,
            trainingId,
            status: INVITE_STATUS.PENDING,
            createdAt: new Date()
        });
        console.log(INVITE_STATUS);
        console.log(newInvite);
        const createInvite = await newInvite.save();
        
        return createInvite !== null 
               ? await this.prepareResponseData(createInvite) 
               : undefined;
    }

    async removeInvite(inviteId) {
        const isDeleted = (await Invite.deleteOne({ _id: inviteId })).deletedCount;
        return isDeleted === 1 ? isDeleted : undefined;
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