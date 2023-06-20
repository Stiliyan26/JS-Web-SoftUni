const router = require('express').Router();
const mapErrors = require('../util/mappers');
const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');

router.get('/create', isUser(), (req, res) => {
});

router.post('/create', isUser(), async (req, res) => {
    const trip = {
        
    };

    try {
        //redirect
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
       //render
    }
});

router.get('/edit/:id', preload(false), isOwner(), (req, res) => {
    
});

router.post('/edit/:id', preload(false), isOwner(), async (req, res) => {
    const id = req.params.id;

    const trip = {
       
    };

    try {
        //redirect
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        //trip._id = id;
        //render
    }
});

router.get('/delete/:id', preload(false), isOwner(), async (req, res) => {
    //redirect
});

router.get('/join/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
    } catch (err) {
        //TODO why we delete errors
        console.error(err);
    } finally {
        //redirect
    }
});

module.exports = router;