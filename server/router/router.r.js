const express = require('express');
const router = express.Router();
const userC = require('../controllers/user.c');
const classC = require('../controllers/class.c');
const { passport } = require('../middlewares/passport');

router.post('/api/signup', userC.postSignup);
router.get('/api/user/email-confirm/:token', userC.getEmailActivationConfirmation);
router.post('/api/login', userC.postLogin);
router.get('/api/logout', userC.getLogout);
router.post('/api/user/password-reset', userC.postResetPassword);
router.post('/api/user/password-reset/confirmation', userC.postResetPasswordConfirmation);
router.get('/api/get-profile', passport.authenticate('jwt', { session: false }), userC.getProfile);
router.post('/api/edit-profile', passport.authenticate('jwt', { session: false }), userC.postEditProfile);
router.post('/api/refresh_token', userC.postRefreshToken);

// invite student
router.post('/api/class/invite-members', passport.authenticate('jwt', { session: false }), classC.postInviteMembers);

router.get(
    '/api/check-user-class/:classID/user/:userID',
    passport.authenticate('jwt', { session: false }),
    classC.getCheckUserExistInClass,
);

router.post('/api/check-invitation', passport.authenticate('jwt', { session: false }), userC.checkInvitation);

router.post('/api/class/add-member', passport.authenticate('jwt', { session: false }), classC.postAddMemberToClass);
//-------------------------Class Manager------------------------------------------------------------------------
router.get('/api/all-classes', passport.authenticate('jwt', { session: false }), classController.getAllClasses);
router.post('/api/create-class', passport.authenticate('jwt', { session: false }), classController.postCreateClass);
router.get('/api/class/:classID', passport.authenticate('jwt', { session: false }), classController.getClassDetail);

module.exports = router;
