const bcrypt = require('bcrypt');

function accessoryToViewModel(accessory) {
    return {
        id: accessory._id,
        name: accessory.name,
        description: accessory.description,
        imageURL: accessory.imageURL,
        price: accessory.price,
        owner: accessory.owner
    }
}

function carViewModel(car) {
    const model = {
        id: car._id,
        name: car.name,
        description: car.description,
        imageURL: car.imageURL,
        price: car.price,
        accessories: car.accessories,
        owner: car.owner
    }

    if (model.accessories.length > 0 && model.accessories[0].name) {
        model.accessories = model.accessories.map(accessoryToViewModel);
    }

    return model;
}

async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

async function comparePassword(password, hashedpassword) {
    return bcrypt.compare(password, hashedpassword);
}

function isLoggedIn() {
    return function (req, res, next) {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}

module.exports = {
    accessoryToViewModel,
    carViewModel,
    hashPassword,
    comparePassword,
    isLoggedIn
}