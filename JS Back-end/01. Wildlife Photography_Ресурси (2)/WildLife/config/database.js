const mongoose = require('mongoose');
require('../models/User.js');

const connectionString = 'mongodb://localhost:27017/wildlife';

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database error');
            console.error(err);
        })
    } catch (err) {
        console.error('Error connecting to database');
        process.exit(1);            
    }
}