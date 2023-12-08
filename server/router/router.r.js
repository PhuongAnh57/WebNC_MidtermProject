const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.c');
const { passport } = require('../middlewares/passport');

router.post('/api/signup', controller.postSignup);
router.get('/api/user/email-confirm/:token', controller.getEmailActivationConfirmation);
router.post('/api/login', controller.postLogin);
router.get('/api/logout', controller.getLogout);
router.post('/api/user/password-reset', controller.postResetPassword);
router.post('/api/user/password-reset/confirmation', controller.postResetPasswordConfirmation);
router.get('/api/edit-profile', passport.authenticate('jwt', { session: false }), controller.getEditProfile);
router.post('/api/edit-profile', passport.authenticate('jwt', { session: false }), controller.postEditProfile);
router.post('/api/refresh_token', controller.postRefreshToken);

// invite student
router.post('/api/class/invite-students', controller.postInviteStudents);

module.exports = router;
