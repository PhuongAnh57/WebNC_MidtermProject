const express = require('express');
const multer = require('multer');
const router = express.Router();
const userC = require('../controllers/user.c');
const classC = require('../controllers/class.c');
const assignmentC = require('../controllers/assignment.c');
const { passport } = require('../middlewares/passport');

// setup multer as a middleware to grab files upload
const upload = multer({ storage: multer.memoryStorage() });

// authenticate
router.post('/signup', userC.postSignup);
router.get('/user/email-confirm/:token', userC.getEmailActivationConfirmation);
router.post('/login', userC.postLogin);
router.get('/logout', userC.getLogout);
router.post('/user/password-reset', userC.postResetPassword);
router.post('/user/password-reset/confirmation', userC.postResetPasswordConfirmation);
router.get('/get-profile', passport.authenticate('jwt', { session: false }), userC.getProfile);
router.post('/edit-profile', passport.authenticate('jwt', { session: false }), userC.postEditProfile);
router.post('/refresh_token', userC.postRefreshToken);

// invite student
router.post('/class/invite-members', passport.authenticate('jwt', { session: false }), classC.postInviteMembers);

router.get(
    '/check-user-class/:classID/user/:userID',
    passport.authenticate('jwt', { session: false }),
    classC.getCheckUserExistInClass,
);

router.post('/check-invitation', passport.authenticate('jwt', { session: false }), userC.checkInvitation);
router.post('/class/add-member', passport.authenticate('jwt', { session: false }), classC.postAddMemberToClass);

//-------------------------Class Management------------------------------------------------------------------------
router.get('/all-classes', passport.authenticate('jwt', { session: false }), classC.getAllClasses);
router.post('/create-class', passport.authenticate('jwt', { session: false }), classC.postCreateClass);
router.get('/class/:classID/:userID', passport.authenticate('jwt', { session: false }), classC.getClassDetail);
router.get('/all-members/:classID', passport.authenticate('jwt', { session: false }), classC.getAllMembers);

//-------------------------Assignment Management-------------------------------------------------------------
router.post(
    '/class/:classID/assignment/add',
    passport.authenticate('jwt', { session: false }),
    upload.array('files', 5),
    assignmentC.postAddAssignment,
);

router.get(
    '/class/:classID/assignment/all',
    passport.authenticate('jwt', { session: false }),
    assignmentC.getAssignmentsOfClass,
);

router.get(
    '/class/:classID/assignment/:assignmentID/detail',
    passport.authenticate('jwt', { session: false }),
    assignmentC.getDetailAssignment,
);

router.put(
    '/class/:classID/assignment/:assignmentID/update',
    passport.authenticate('jwt', { session: false }),
    assignmentC.putEditAssignment,
);

router.delete(
    '/class/:classID/assignment/:assignmentID',
    passport.authenticate('jwt', { session: false }),
    assignmentC.deleteRemoveAssignment,
);

module.exports = router;
