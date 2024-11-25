const mongoose = require('mongoose');

const { Schema } = mongoose;
const uuid = require('uuid');
const INVITE_STATUS = require('../common/constants');

const InviteSchema = new Schema(
    {
      // _id: {
      //   type: String,
      //   // default: uuid,
      //   required: true
      // },
      from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
       },
      to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
       },
      trainingId: {
        type: String,
        // default: uuid,
        required: true
       },
      status: {
        type: String,
        default: INVITE_STATUS.PENDING,
        required: true },
      createdAt: {
        type: Date,
        required: true },
    },
    { collections: 'invite' }
  );

  const toResponse = invite => {
    const { _id, from, to, trainingId, status, createdAt } = invite;
    return { _id, from, to, trainingId, status, createdAt };
  };

  module.exports = {
    Invite: mongoose.model('Invite', InviteSchema),
    toResponse
  };