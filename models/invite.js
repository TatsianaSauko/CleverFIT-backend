const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const uuid = require('uuid');
const INVITE_STATUS = require('../common/constants');

const InviteSchema = new Schema(
    {
      _id: {
        type: String,
        default: uuid, 
        required: true
      },
      fromUserId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
       },
      toUserId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
       },
      trainingId: {
        type: String,
        default: uuid, 
        required: true
       },
      status: { 
        type: String, 
        default: INVITE_STATUS.WAITING },
      createdAt: { 
        type: Date, 
        required: true },
    },
    { collections: 'invite' }
  );

  const toResponse = invite => {
    const { id, fromUserId, toUserId, trainingId, status, createdAt } = invite;
    return { id, fromUserId, toUserId, trainingId, status, createdAt };
  };
  
  module.exports = {
    Invite: mongoose.model('invite', InviteSchema),
    toResponse
  };