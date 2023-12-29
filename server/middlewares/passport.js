const { ExtractJwt, Strategy } = require('passport-jwt');
const userC = require('../models/user.m');

const passport = require('passport');

const applyPassportStrategy = (passport) => {
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    };

    passport.use(
        new Strategy(jwtOptions, async (jwt_payload, done) => {
            // passport-jwt already verified the signature. We can now use the jwt_payload
            try {
                // console.log(jwt_payload);
                const user = await userC.getUserByID(jwt_payload.id);

                if (user) {
                    return done(null, jwt_payload);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(null, false);
            }
        }),
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};

module.exports = { applyPassportStrategy, passport };
