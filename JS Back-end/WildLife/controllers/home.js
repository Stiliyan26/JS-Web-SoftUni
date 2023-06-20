const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const router = require('express').Router();
const { getAllPosts, populatedVoters, getPostsByAuthor } = require('../services/post');

router.get('/', (req, res) => {
    res.render('home', { title: 'Home page' })
});

router.get('/catalog', async (req, res) => {
    const posts = await getAllPosts();
    res.render('catalog', { title: 'Catalog', posts });
});

router.get('/catalog/:id', preload(true), async (req, res) => {
    const post = res.locals.post;
    const populatedPost = await populatedVoters(post._id);
    post.peopleVoted = populatedPost.votes.map(u => u.email).join(', ');

    if (req.session.user) {
        post.isUser = true;
        post.isOwner = post.author._id == req.session.user._id;

        if (post.votes.some(v => v._id == req.session.user._id)) {
            post.hasVoted = true;
        }
    }

    res.render('details', { title: `${post.title} Details`, post });
});

router.get('/profile', isUser(), async (req, res) => {
    const posts = await getPostsByAuthor(req.session.user._id);
    res.render('profile', { title: 'Profile', posts });
});

module.exports = router;