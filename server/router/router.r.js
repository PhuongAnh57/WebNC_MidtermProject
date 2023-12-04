const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.c');
const { passport } = require('../middlewares/passport');

router.post('/api/signup', userController.postSignup);
router.get('/api/users/:id/email-confirm/:token', userController.getEmailActivationConfirmation);
router.post('/api/login', userController.postLogin);
router.get('/api/logout', userController.getLogout);
router.post('/api/users/:id/password-reset', userController.postResetPassword);
router.get('/api/edit-profile', passport.authenticate('jwt', { session: false }), userController.getEditProfile);
router.post('/api/edit-profile', passport.authenticate('jwt', { session: false }), userController.postEditProfile);
router.post('/api/refresh_token', userController.postRefreshToken);

module.exports = router;
