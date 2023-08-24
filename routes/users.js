const router = require('express').Router();

const { getMe, updateProfile } = require('../controllers/users');

router.get('/me', getMe);
router.patch('/me', updateProfile);

module.exports = router;
