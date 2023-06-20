const User = require('../models/User.js');


async function testUser() {
    const user = await User.findOne({ username: 'pepsi' });
    user.hashedPassword = '2626';
    await user.save();
    console.log(user);
}

async function register(session, username, password) {
    const user = new User({
        username,
        hashedPassword: password
    });
    await user.save();

    session.user = {
        id: user._id,
        username: user.username,
    }
}

async function login(session, username, password) {
    const user = await User.findOne({ username });

    const result = await user.comparePassword(password);

    if (user && result) {
        session.user = {
            id: user._id,
            username: user.username,
        }
        return true;
    }

    throw new Error('Incorrect username or password!');
}

async function logout(session){
    delete session.user;   
}

module.exports = () => (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
        res.locals.hasUser = true;
    }

    req.auth = {
        register: (...params) => register(req.session, ...params),
        login: (...params) => login(req.session, ...params),
        logout: () => logout(req.session)           
    };

    next();
}