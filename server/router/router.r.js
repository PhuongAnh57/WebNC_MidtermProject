const express = require('express');
const multer = require('multer');
const router = express.Router();
const userC = require('../controllers/user.c');
const classC = require('../controllers/class.c');
const resourceC = require('../controllers/resource.c');
const adminC = require('../controllers/admin.c');
const { passport } = require('../middlewares/passport');

// Multer configuration
const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({ storage: storage });

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
router.post(
    '/class/add-member/class-code',
    passport.authenticate('jwt', { session: false }),
    classC.postAddMemberToClassByCode,
);

//-------------------------Class Management------------------------------------------------------------------------
router.get('/all-classes', passport.authenticate('jwt', { session: false }), classC.getAllClasses);
router.post('/create-class', passport.authenticate('jwt', { session: false }), classC.postCreateClass);
router.get('/class/:classID/:userID', passport.authenticate('jwt', { session: false }), classC.getClassDetail);
router.get('/all-members/:classID', passport.authenticate('jwt', { session: false }), classC.getAllMembers);

//-------------------------Resource Management-------------------------------------------------------------
router.post(
    '/class/:classID/resource/:resourceID/add_file',
    passport.authenticate('jwt', { session: false }),
    upload.single('file'),
    resourceC.postAddFile,
);

router.post(
    '/class/:classID/resource/add_resource',
    passport.authenticate('jwt', { session: false }),
    resourceC.postAddResource,
);

router.get(
    '/class/:classID/resource/all',
    passport.authenticate('jwt', { session: false }),
    resourceC.getResourcesOfClass,
);

router.get(
    '/class/:classID/resource/:resourceID/detail',
    passport.authenticate('jwt', { session: false }),
    resourceC.getDetailResource,
);

router.put(
    '/class/:classID/resource/:resourceID/update',
    passport.authenticate('jwt', { session: false }),
    resourceC.putEditResource,
);

router.delete(
    '/class/:classID/resource/:resourceID',
    passport.authenticate('jwt', { session: false }),
    resourceC.deleteRemoveResource,
);

// ------------------- Admin management ----------------------
router.get('/get-accounts/:role', passport.authenticate('jwt', { session: false }), adminC.getMembersByRole);
router.get(
    '/get-accounts/:role/:keyword/:type',
    passport.authenticate('jwt', { session: false }),
    adminC.getMembersByKeyWord,
);
router.get('/get-account/:userID', passport.authenticate('jwt', { session: false }), adminC.getMemberByID);
router.post('/delete-account/:userID', passport.authenticate('jwt', { session: false }), adminC.deleteMemberByID);

module.exports = router;
