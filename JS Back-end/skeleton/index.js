const express = require('express');
const databaseConfing = require('./config/database.js');
const expressConfig = require('./config/express.js');
const routesConfig = require('./config/routes.js');
start();

async function start() {
    const app = express();

    expressConfig(app);
    await databaseConfing(app);   
    routesConfig(app);

    console.log('http://localhost:3000');
    app.get('/', (req, res) => {
        res.render('home', { layout: false })
    });

    app.listen(3000);
}