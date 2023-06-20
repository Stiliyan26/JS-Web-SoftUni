const router = require('express').Router();
const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createPublication, getPublicationById, updatePublicationById, deleteById, sharePost } = require('../services/publication');
const mapErrors = require('../util/mappers');


router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Publication' });
});

router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id;

    const publication = {
        title: req.body.title,
        paintTehn: req.body.paintTehn,
        artPicture: req.body.artPicture,
        certificate: req.body.certificate,
        author: userId
    };

    try {
        await createPublication(publication);
        res.redirect('/gallery');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Publication', data: publication, errors });
    }
});

router.get('/edit/:id', preload(false), isOwner(), async (req, res) => {
    res.render('edit', { title: 'Edit' });
});

router.post('/edit/:id', preload(false), isOwner(), async (req, res) => {
    const id = req.params.id;

    const publication = {
        title: req.body.title,
        paintTehn: req.body.paintTehn,
        artPicture: req.body.artPicture,
        certificate: req.body.certificate,
    };

    try {
        await updatePublicationById(id, publication);
        res.redirect(`/gallery/${id}`);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        publication._id = id;
        res.render('edit', { title: 'Edit', publication, errors });
    }
});

router.get('/delete/:id', preload(false), isOwner(), async (req, res) => {
    await deleteById(req.params.id);
    res.redirect('/gallery');
});

router.get('/share/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await sharePost(id, req.session.user._id);
    } catch (err){
        console.error(err);
    } finally{
        res.redirect(`/gallery/${id}`);
    }
})

module.exports = router;
