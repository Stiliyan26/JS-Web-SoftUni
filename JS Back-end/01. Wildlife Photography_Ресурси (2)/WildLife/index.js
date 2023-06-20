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
    
    app.listen(3000, () => console.log("Server started on http://localhost:3000"));
}