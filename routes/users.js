const router = require('express').Router();

const { validateProfile } = require('../middlewares/validation-joi');

const { getMe, updateProfile } = require('../controllers/users');

router.get('/me', getMe);
router.patch('/me', validateProfile, updateProfile);

module.exports = router;
