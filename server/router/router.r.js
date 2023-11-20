const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.c');
const { passport } = require('../middlewares/passport');

router.post('/signup', userController.postSignup);
router.post('/login', userController.postLogin);
router.get('/logout', userController.getLogout);
router.get('/edit-profile', passport.authenticate('jwt', { session: false }), userController.getEditProfile);
router.post('/edit-profile', passport.authenticate('jwt', { session: false }), userController.postEditProfile);
router.post('/refresh_token', userController.postRefreshToken);

module.exports = router;
