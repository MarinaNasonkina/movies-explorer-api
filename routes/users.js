const router = require('express').Router();

const { validateUserInfo } = require('../middlewares/validation-joi');

const { getMe, updateProfile } = require('../controllers/users');

router.get('/me', getMe);
router.patch('/me', validateUserInfo, updateProfile);

module.exports = router;
