const mongoose = require('mongoose');
require('./Car.js');
require('./Accesory.js');

const connectingString = 'mongodb://localhost:27017/carbicle';

async function initDb() {
    try {
        await mongoose.connect(connectingString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('database connected.');

        mongoose.connection.on('error', (err) => {
            console.error('Database error.');
            console.error(err);
        })
    }
    catch (err) {
        console.log('Error connecting to database.');
        process.exit(1);
    }
}

module.exports = initDb