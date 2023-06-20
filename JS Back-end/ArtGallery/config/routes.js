const auhtController = require('../controllers/auth');
const postController = require('../controllers/post');
const homeController = require('../controllers/home');


module.exports = (app) => {
    app.use(homeController);
    app.use(auhtController);
    app.use(postController);

    app.get('*', (req, res) => {
        res.render('404', { title: 'Page Not Found'});
    })
}