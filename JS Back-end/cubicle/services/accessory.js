const Accessory = require('../models/Accesory.js');
const { accessoryToViewModel } = require('./utils.js');


async function getAll() {
    const data = await Accessory.find({});

    return data.map(accessoryToViewModel);
}

async function createAccessory(accessory) {
    await Accessory.create(accessory)
}

module.exports = () => (req, res, next) => {
    req.accessory = {
        getAll,
        createAccessory
    };
    next();
};