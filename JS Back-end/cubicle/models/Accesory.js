const { Schema, model, Types: { ObjectId } } = require('mongoose');

const accesorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    imageURL: { type: String, default: 'noImage.png' },
    price: {type: Number, min: 0},
    owner: {type: ObjectId, ref: 'User'}
});

const Accessory = model('Accessory', accesorySchema);

module.exports = Accessory;