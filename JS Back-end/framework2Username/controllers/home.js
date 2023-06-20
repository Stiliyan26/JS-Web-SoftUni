const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', { layout: false })
});

router.get('/catalog', async (req, res) => {
    console.log('catalog');
});

router.get('/catalog/:id', preload(true), (req, res) => {
    console.log('details');
    
});

router.get('/profile', isUser(), async (req, res) => {
    console.log('profile');
});

module.exports = router;