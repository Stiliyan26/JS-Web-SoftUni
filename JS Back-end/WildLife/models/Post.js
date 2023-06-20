const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATERN = /^https?:\/\/(.+)/;

const postSchema = new Schema({
    title: { type: String, required: true,  minlength: [6, 'Title should be at least 6 characters long!'] },
    keyword: { type: String, required: true,  minlength: [6, 'Keyword should be at least 6 characters long!'] },
    location: { type: String, required: true, maxlength: [15, 'Location should me maximum of 15 characters long!'] },
    date: { type: String, required: true, minlength: [10, 'Date must be 10 characters long'],
    maxlength: [10, 'Date must be 10 characters long'], },
    image: { type: String, required: true, validate: {
        validator(value){
            return URL_PATERN.test(value);
        },
        message: 'Invalid image pattern!'
    } },
    description: { type: String, required: true, minlength: [8  , 'Description should be at least 8 characters long!']  },
    author: { type: ObjectId, ref: 'User' },
    votes: { type: [ObjectId], ref: 'User', default: [] },
    rating: { type: Number, default: 0 }
})

const Post = model('Post', postSchema);

module.exports = Post;