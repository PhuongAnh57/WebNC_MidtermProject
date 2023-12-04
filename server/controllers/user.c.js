const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userM = require('../models/user.m');
const pendingUserM = require('../models/pending_user.m');
const mailer = require('../utils/mailer');

exports.postSignup = async (req, res) => {
    const { firstName, lastName, username, password, email } = req.body.user;

    try {
        const users = await userM.getAllUsers();
        const pendingUsers = await pendingUserM.getAllUsers();

        const userExists = users.find((user) => user.username === username || user.email === email);
        const pendingUserExists = pendingUsers.find(
            (pendingUser) => pendingUser.username === username || pendingUser.email === email,
        );

        if (userExists || pendingUserExists) {
            res.status(400).json({ message: 'Username or email already belongs to another user' });
            console.log('Username or email already belongs to another user');
        }

        if (!userExists && !pendingUserExists) {
            let id;
            if (!pendingUsers || !pendingUsers?.length) {
                id = 0;
            } else {
                id = pendingUsers[pendingUsers.length - 1].user_id + 1;
            }

            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    const newUser = {
                        id,
                        firstName,
                        lastName,
                        username,
                        password: hash,
                        email,
                        verifyToken: crypto.randomBytes(32).toString('hex'),
                    };

                    const result = await pendingUserM.addNewUser(newUser);
                    await mailer.sendConfirmationEmail(newUser, newUser.verifyToken);

                    if (!result) {
                        console.log('Error occurred when trying to create user');
                    } else {
                        res.json({ message: 'Pending user account created' });
                        console.log('Pending User account created');
                    }
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
};

exports.getEmailActivationConfirmation = async (req, res) => {
    const { id, token } = req.params;

    try {
        const userExists = await userM.getUserByToken(token).catch((err) => {});

        if (userExists) {
            return res.status(200).json({ message: `User ${id} has been activated` });
        }

        const pendingUserExists = await pendingUserM.getUserByToken(token).catch((err) => {});

        if (!pendingUserExists && !userExists) {
            return res.status(400).json({ message: 'User cannot be activated' });
        }

        const users = await userM.getAllUsers();

        let newID;
        if (!users || !users?.length) {
            newID = 0;
        } else {
            newID = users[users.length - 1].user_id + 1;
        }

        const newUser = {
            ...pendingUserExists,
            id: newID,
            gender: null,
            dateOfBirth: null,
            address: null,
        };

        await userM.addNewUser(newUser);
        await pendingUserM.removeUser(id);

        res.status(200).json({ message: `User ${id} has been activated` });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'User cannot be activated' });
    }
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body.user;

    const userDB = await userM.getUserByUsername(username).catch((err) => {
        console.log(err);
    });

    if (!userDB) {
        console.log('This account does not exist');
        return res.json({ message: 'This account does not exist' });
    }

    const passwordMatch = await bcrypt.compare(password, userDB.password);

    if (!passwordMatch) {
        res.json({ message: 'Password is invalid' });
        console.log('Password is invalid');
    } else {
        const payload = {
            id: userDB.user_id,
        };

        try {
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_LIFE,
            });

            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: process.env.REFRESH_TOKEN_LIFE,
            });

            const response = {
                message: 'Verification successfully',
                user: {
                    uid: userDB.user_id,
                    lastName: userDB.last_name,
                },
                accessToken: token,
                refreshToken: refreshToken,
            };

            res.json(response);
        } catch (err) {
            res.json({ message: 'Login failed' });
        }
    }
};

exports.getLogout = (req, res) => {
    res.json({ message: 'Logging out' });
};

exports.postResetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const userExists = await userM.getUserByEmail(email);

        if (!userExists) {
            return res.status(400).json({ message: 'Account does not exist' });
        }
    } catch (err) {
        console.log(err);
    }
};

exports.postRefreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedValue) => {
            if (err) {
                res.json({ message: 'Verification failed' });
            }
            if (decodedValue) {
                const payload = {
                    id: decodedValue.id,
                };

                const newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: process.env.TOKEN_LIFE,
                });

                res.json({ token: newToken });
            }
        });
    } catch (err) {
        console.log(err);
        res.json({ message: 'Invalid refresh token' });
    }
};

// authentication test with jwt
exports.getEditProfile = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.json({ message: 'Unauthorization' });
    }

    const userID = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodeValue) => {
        if (err) {
            res.json({ message: 'Invalid token' });
        } else {
            return decodeValue.id;
        }
    });

    try {
        const user = await userM.getUserByID(userID);

        if (!user) {
            res.json({ message: 'User not found' });
        } else {
            const userData = {
                firstName: user.first_name,
                lastName: user.last_name,
                dateOfBirth: user.day_of_birth,
                gender: user.gender,
                email: user.email,
                address: user.address,
            };

            res.json({ message: 'User found', userData });
        }
    } catch (err) {
        console.log(err);
        res.json({ message: 'Something went wrong' });
    }
};

exports.postEditProfile = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    const userData = req.body.userData;

    if (!token) {
        res.json({ message: 'Unauthorization' });
        return;
    }

    const userID = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodeValue) => {
        if (err) {
            res.json({ message: 'Invalid token' });
        } else {
            return decodeValue.id;
        }
    });

    try {
        const user = await userM.getUserByID(userID);

        if (!user) {
            return res.json({ message: 'User does not exist' });
        }

        const userEdit = {
            userID: userID,
            firstName: userData.firstName,
            lastName: userData.lastName,
            gender: userData.gender,
            dayOfBirth: userData.dateOfBirth,
            email: userData.email,
            address: userData.address,
        };

        console.log('sf');

        await userM.editUser(userEdit);

        return res.json({ message: 'Update successfully' });
    } catch (err) {
        console.log(err);
        res.json({ message: 'Something went wrong' });
    }
};
