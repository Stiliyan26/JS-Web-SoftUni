const { Schema, model } = require('mongoose');

//TODO change user model according to exam description
//TODO add validation
const usersSchema = new Schema({
    email: {type: String, required: true},
    hashedPassword: {type: String, required: true}
});

usersSchema.index({ email: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', usersSchema);

module.exports = User;  