const router = require('express').Router();

const auth = require('../middlewares/auth');
const { validateUser, validateAuthData } = require('../middlewares/validation-joi');

const { createUser, login, logout } = require('../controllers/auth');
const notFound = require('../controllers/not-found');

const users = require('./users');
const movies = require('./movies');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateAuthData, login);

router.use(auth);
router.post('/logout', logout);
router.use('/users', users);
router.use('/movies', movies);
router.use('*', notFound);

module.exports = router;
