const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.c');

router.post('/api/register', userController.postRegister);

module.exports = router;
