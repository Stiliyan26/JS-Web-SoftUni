const { Schema, model } = require('mongoose');
const { comparePassword, hashPassword } = require('../services/utils.js');

const userSchema = new Schema({
    username: { type: String, required: true, minLength: 3 },
    hashedPassword: { type: String, required: true },
})

userSchema.methods.comparePassword = async function (password) {
    return await comparePassword(password, this.hashedPassword);
}

userSchema.pre('save', async function (next) {
    if (this.isModified('hashedPassword')) {
        console.log('Hashing new password');
        this.hashedPassword = await hashPassword(this.hashedPassword);
    }

    next();
});

const User = model('User', userSchema);

module.exports = User