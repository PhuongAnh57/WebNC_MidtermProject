const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.c');
const { passport } = require('../middlewares/passport');

router.post('/register', userController.postRegister);
router.post('/login', userController.postLogin);
router.get('/logout', userController.getLogout);
router.get('/authenticate', passport.authenticate('jwt', { session: false }), userController.getAuthenticate);
router.post('/refresh_token', userController.postRefreshToken);

module.exports = router;
