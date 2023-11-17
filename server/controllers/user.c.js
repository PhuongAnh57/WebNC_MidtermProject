const userM = require('../models/user.m');

exports.postRegister = async (req, res) => {
    // const { fullname, username, password, email, address } = req.body.user;

    // const emailExists = await userM.getUserByEmail(email);
    // const usernameExists = await userM.getUserByUsername(username);
    res.send('home');
};
