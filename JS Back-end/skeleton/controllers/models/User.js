const { Schema, model, Types: { ObjectId } } = require('mongoose');

//TODO change user model according to exam description
//TODO add validation
const userSchema = new Schema({
    username: { type: String, required: true, minlength: [4, 'Username should be at least 4 characters long'] },
    hashedPassword: { type: String, required: true },
    address: { type: String, requred: true, maxlength: [20, 'The address should be maximum 20 characters long'] },
    publications: { type: [ObjectId], ref: 'Publication', default: [] }
});

//TODO change index parameter to email if it is written on the exam description
userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;