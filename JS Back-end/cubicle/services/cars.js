const fs = require('fs/promises');
const Car = require('../models/Car.js');
const { carViewModel } = require('./utils.js');

/*
const filePath = './services/data.json';

async function read() {
    try {
        const file = await fs.readFile(filePath);
        return JSON.parse(file);

    } catch (err) {
        console.error('Database read error');
        console.error(err);
        process.exit(1);
    }
}

async function write(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    } catch (err) {
        console.error('Database read error');
        console.error(err);
        process.exit(1);
    }
}
*/

async function getAll(query) {
    /*
    READING FROM DATABASE WAY
    const cars = await Car.find({}).lean();
    */
    const options = {};

    if (query.search) {
        options.name = new RegExp(query.search, 'i');
    }

    if (query.from) {
        options.price = { $gte: Number(query.from) }
    }

    if (query.to) {
        if (!options.price) {
            options.price = {};
        }
        options.price.$lte = Number(query.to);
    }

    const cars = await Car.find(options);
    return cars.map(carViewModel);


    /*
    READING FROM A FILE WAY

    const data = await read();

    let cars = Object
        .entries(data)
        .map(([id, obj]) => Object.assign({}, { id }, obj));

    if (query.search) {
        cars = cars.filter(c => c.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()));
    }

    if (query.from) {
        cars = cars.filter(c => c.price >= Number(query.from));
    }

    if (query.to) {
        cars = cars.filter(c => c.price <= Number(query.to));
    }

    return cars;
    */
}

async function updateById(id, car, ownerId) {
    /*await Car.findByIdAndUpdate(id, car);*/
    const existing = await Car.findById(id);

    if (existing.owner != ownerId){
        return false;
    }

    existing.name = car.name;
    existing.description = car.description;
    existing.imageURL = car.imageURL || undefined;
    existing.price = car.price;
    existing.accessories = car.accessories;

    await existing.save();

    return true;
    /*
    const data = await read();

    if (data.hasOwnProperty(id)) {
        data[id] = car;
        await write(data);
    } else {
        throw new ReferenceError('No ID in database.');
    }
    */
}

async function attachAccessory(carId, accessoryId) {   
    const car = await Car.findById(carId);

    if (car.owner != ownerId){
        return false;
    }
    car.accessories.push(accessoryId);

    await car.save();
    return true;
}

async function deleteById(id, ownerId) {
    const existing = await Car.findById(id);
    
    if (existing.owner != ownerId){
        return false;
    }

    await Car.findByIdAndDelete(id);
    return true;        

    /*
    const data = await read();

    if (data.hasOwnProperty(id)) {
        delete data[id];
        await write(data);
    } else {
        throw new ReferenceError('No ID in database.');
        
    }
    */
}

async function getById(id) {
    const car = await Car.findById(id).populate('accessories');

    if (car) {
        return carViewModel(car);
    }
    else {
        return undefined;
    }
    /*
    READING FROM A FILE WAY

    const data = await read();
    const car = data[id];

    if (car) {
        return Object.assign({}, { id }, car);
    } else {
        return undefined;
    }
    */
}

async function createCar(car) {
    const result = new Car(car);
    await result.save();

    /*
    READING FROM A FILE WAY

    const cars = await read();
    let id;

    do {
        id = nextId();
    } while (cars.hasOwnProperty(id));

    cars[id] = car;
    await write(cars);
    */
}
/*
function nextId() {
    return 'xxxxxxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}
*/

async function carMiddleware(req, res, next) {
    req.storage = {
        getAll,
        getById,
        createCar,
        deleteById,
        updateById,
        attachAccessory
    };

    next();
};

module.exports = {
    carMiddleware,
}
