const { Router } = require('express');
const { isUser, isGuest } = require('../middleware/guard');
const { register, login } = require('../services/user');
const mapErrors = require('../util/mappers');

const router = Router();

router.get('/', (req, res) => {
    console.log('hey');
});

router.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

//TODO check form action, method, fileds name   
router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() == '') {
            throw new Error('Password is required');
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
        }

        const user = await register(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/'); //TODO check redirect requirements

    } catch (err) {
        console.error(err);
        //TODO send error message
        const errors = mapErrors(err);
        res.render('register', { data: { email: req.body.email }, errors });
    }

});

router.get('/login', isGuest(), (req, res) => {
    res.render('login');
});

//TODO check form action, method, fileds name   
router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        console.error(err);
        //TODO send error message
        const errors = mapErrors(err);
        res.render('login', { data: { email: req.body.email }, errors });
    }
});

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/');
});



module.exports = router;