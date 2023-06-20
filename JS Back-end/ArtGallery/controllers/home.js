const router = require('express').Router();
const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { getAllPublications, publicationByUser, getUserById } = require('../services/publication');


router.get('/', async (req, res) => {
    const posts = await getAllPublications();
    res.render('home', { title: 'Home Page', posts })
});

router.get('/gallery', async (req, res) => {
    const publications = await getAllPublications();
    res.render('gallery', { title: 'Gallery', publications });
});

router.get('/gallery/:id', preload(true), async (req, res) => {
    if (req.session.user) {
        res.locals.publication.hasUser = true;
        res.locals.publication.isOwner = req.session.user._id == res.locals.publication.author._id;
        if (res.locals.publication.usersShared.some(u => u._id == req.session.user._id)) {
            res.locals.publication.hasShared = true;
        }
    }
    res.render('details', { title: res.locals.publication.title });
});

router.get('/profile', isUser(), async (req, res) => {
    const userId = req.session.user._id;
    const publicByUser = await publicationByUser(userId);
    const publicationsList = publicByUser.map(u => u.title).join(', ');
    const user = await getUserById(userId);
    const sharedList = user.publications.map(p => p.title).join(', ');
    
    const data = {
        user,
        publicationsList,
        sharedList
    }
    res.render('profile', { title: 'Profile', data })
});

module.exports = router;