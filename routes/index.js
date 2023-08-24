const router = require('express').Router();

const auth = require('../middlewares/auth');

const { createUser, login, logout } = require('../controllers/auth');
const notFound = require('../controllers/not-found');

const users = require('./users');
const movies = require('./movies');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth);
router.post('/logout', logout);
router.use('/users', users);
router.use('/movies', movies);
router.use('*', notFound);

module.exports = router;
