const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: String,
    lastName: String,
    birthday: Date,
    imgSrc: String,
    readyForJointTraining: Boolean,
    sendNotification: Boolean,
    tariff: {
        tariffId: String,
        expired: Date,
    },
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(+process.env.HASH_SALT);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);

