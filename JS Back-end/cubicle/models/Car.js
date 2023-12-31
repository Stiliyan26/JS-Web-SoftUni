 const {Schema, model, Types: { ObjectId }} = require('mongoose');

 const carSchema = new Schema({
     name: {type: String, required: true},
     description: {type: String, default: ''},
     imageURL: {type: String, default: 'noImage.png'},
     price: {type: Number, required: true, min: 0},
     accessories: {type: [ObjectId], default: [], ref: 'Accessory'},
     isDeleted:{type: Boolean, default: false},
     owner: {type: ObjectId, ref: 'User'}
 }); 

 const Car = model('Car', carSchema);
 
 module.exports = Car;  