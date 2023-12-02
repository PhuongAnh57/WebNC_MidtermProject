const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userM = require('../models/user.m');
// const pendingUserM = require('../models/pending_user.m');

exports.postSignup = async (req, res) => {
    const { firstName, lastName, username, password, email } = req.body.user;

    try {
        const emailUser = await userM.getUserByEmail(email);
        const usernameUser = await userM.getUserByUsername(username);

        // const emailPending = await pendingUserM.getUserByEmail(email);
        // const usernamePending = await pendingUserM.getUserByUsername(username);

        if (emailUser || usernameUser) {
            res.status(400).json({ message: 'Username or email already belongs to another user' });
            console.log('Username or email already belongs to another user');
        }

        if (!emailExists && !usernameExists) {
            const users = await userM.getAllUsers();

            let id;
            if (!users || !users?.length) {
                id = 0;
            } else {
                id = users[users.length - 1].user_id + 1;
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
                        address: undefined,
                        gender: undefined,
                        dob: undefined,
                    };

                    const result = await userM.addNewUser(newUser);

                    if (!result) {
                        console.log('Error occurred when trying to create user');
                    } else {
                        res.json({ message: 'User account created' });
                        console.log('User account created');
                    }
                }
            });
        }
    } catch (err) {
        console.log(err);
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
