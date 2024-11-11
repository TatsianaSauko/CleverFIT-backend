const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const Invite = require('../models/invite');

class InviteService {

    async getAll(userId) {
        const invites = await Invite.find({ userId: userId });

            return {
                statusCode: StatusCodes.OK,
                data: invites
            }
    }

    async create(to, trainingId) {
        
        // catchErrors(async (req, res) => {
      
            // Проверка наличия обязательных полей
            if (!to || !trainingId) {
                return {
                    statusCode: StatusCodes.BAD_REQUEST,
                    error: ReasonPhrases.BAD_REQUEST,                    
                    message: 'Поля toUserId и trainingId обязательны!' 
                };
            }
            const newInvite = new Invite({
                to,
                trainingId
            });

            const createInvite = await newInvite.add();
            return {
                statusCode: StatusCodes.CREATED,
                data: toResponse(createInvite) 
            };
        }
        // )
    }

module.exports = new InviteService();