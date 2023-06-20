const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
const initDb = require('./models/index.js');

const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details } = require('./controllers/details');
const { home } = require('./controllers/home');
const deleteCar = require('./controllers/delete');
const editCar = require('./controllers/edit');
const data = require('./services/cars');
const { notFound } = require('./controllers/notFound');
const accessory = require('./controllers/accesory.js');
const attach = require('./controllers/attach.js');
const accessoryService = require('./services/accessory.js');
const auth = require('./controllers/auth.js');
const authService = require('./services/auth.js');
const { isLoggedIn } = require('./services/utils.js');

start();

async function start() {
    await initDb();

    const app = express();

    app.engine('hbs', hbs.create({
        extname: "hbs"
    }).engine);

    app.set('view engine', 'hbs');

    app.use(session({
        secret: 'pepsiG',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' }
    }));

    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(data.carMiddleware);
    app.use(accessoryService());
    app.use(authService());

    app.get('/', home);
    app.get('/about', about);

    app.route('/create')
        .get(isLoggedIn(), create.get)
        .post(isLoggedIn(), create.post);

    app.get('/details/:id', details);

    app.route('/delete/:id')
        .get(isLoggedIn(), deleteCar.get)
        .post(isLoggedIn(), deleteCar.post);

    app.route('/edit/:id')
        .get(isLoggedIn(), editCar.get)
        .post(isLoggedIn(), editCar.post);

    app.route('/accessory')
        .get(isLoggedIn(), accessory.get)
        .post(isLoggedIn(), accessory.post);

    app.route('/attach/:id')
        .get(isLoggedIn(), attach.get)
        .post(isLoggedIn(), attach.post);

    app.route('/login')
        .get(auth.loginGet)
        .post(auth.loginPost);

    app.route('/register')
        .get(auth.registerGet)
        .post(auth.registerPost);

    app.route('/logout')
        .get(auth.logout);

    app.all('*', notFound);



    app.listen(3000, () => console.log("Server started on http://localhost:3000"));
}