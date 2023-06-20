const router = require('express').Router();
const mapErrors = require('../util/mappers');
const { isUser, isOwner } = require('../middleware/guards');
const { createPost, updatePost, deleteById, vote } = require('../services/post');
const preload = require('../middleware/preload');


router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create post' });
});

router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id;

    const post = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
        author: req.session.user._id
    };

    try {
        await createPost(post, userId);
        res.redirect('/catalog');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create post', post, errors });
    }
});

router.get('/edit/:id', preload(false), isOwner(), (req, res) => {
    const post = res.locals.post;
    res.render('edit', { title: `Edit ${post.title}` });
});

router.post('/edit/:id', preload(false), isOwner(), async (req, res) => {
    const id = req.params.id;

    const post = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
    };

    try {
        await updatePost(id, post);
        res.redirect(`/catalog/${id}`);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        post._id = id;
        res.render('edit', { title: `Edit ${post.title}`, errors });
    }
});

router.get('/delete/:id', preload(false), isOwner(), async (req, res) => {
    await deleteById(req.params.id);
    res.redirect('/catalog');
});

router.get('/vote/:id/:type', preload(true), isUser(), async (req, res) => {
    const post = res.locals.post;
    const id = req.params.id;
    const value = req.params.type == 'upvote' ? 1 : -1;

    try {
        await vote(id, req.session.user._id, value);
        res.redirect('/catalog/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('details', { title: 'Details', errors, post})
    }
});

module.exports = router;