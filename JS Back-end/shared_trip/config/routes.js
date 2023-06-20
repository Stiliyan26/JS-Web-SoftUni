const authController = require('../controllers/auth.js');

module.exports = (app) => {
    app.use(authController)
}