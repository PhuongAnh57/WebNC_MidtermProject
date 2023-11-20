const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userM = require('../models/user.m');

exports.postSignup = async (req, res) => {
    const { firstName, lastName, username, password, email } = req.body.user;

    const emailExists = await userM.getUserByEmail(email).catch((err) => {
        console.log(err);
    });

    const usernameExists = await userM.getUserByUsername(username).catch((err) => {
        console.log(err);
    });

    if (emailExists || usernameExists) {
        res.json({ message: 'Username or email already belongs to another user' });
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

        const saltRounds = 10;

        bcrypt.hash(password, saltRounds, async (err, hash) => {
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
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body.user;

    const userDB = await userM.getUserByUsername(username).catch((err) => {
        console.log(err);
    });

    if (!userDB) {
        res.json({ message: 'This account does not exist' });
        console.log('This account does not exist');
        return;
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
                token: token,
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
        await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedValue) => {
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
exports.getAuthenticate = (req, res) => {
    res.json({ message: 'connect' });
};
