const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.c');
const { passport } = require('../middlewares/passport');

router.post('/api/signup', userController.postSignup);
router.get('/api/user/email-confirm/:token', userController.getEmailActivationConfirmation);
router.post('/api/login', userController.postLogin);
router.get('/api/logout', userController.getLogout);
router.post('/api/user/password-reset', userController.postResetPassword);
router.post('/api/user/password-reset/confirmation', userController.postResetPasswordConfirmation)
router.get('/api/edit-profile', passport.authenticate('jwt', { session: false }), userController.getEditProfile);
router.post('/api/edit-profile', passport.authenticate('jwt', { session: false }), userController.postEditProfile);
router.post('/api/refresh_token', userController.postRefreshToken);

module.exports = router;
