const { Schema, model, Types: { ObjectId } } = require('mongoose');

const EMAIL_PATTERN = /^[a-zA-Z]+@[a-zA-Z]+.[a-zA-Z]+$/;

//TODO change user model according to exam description
//TODO add validation
const userSchema = new Schema({
    firstName: { type: String, required: true, minlength: [3, 'First name should be at least 3 characters long!'] },
    lastName: { type: String, required: true, minlength: [5, 'Last name should be at least 5 characters long!'] },
    email: { type: String, required: true, validate: {
        validator(value){
            return EMAIL_PATTERN.test(value);
        },
        message: 'Inccorect email pattern'
    }},
    hashedPassword: { type: String, required: true,  },
    myPosts: { type: [ObjectId], ref: 'Post', default: [] }
});

//TODO change index parameter to email if it is written on the exam description
userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;