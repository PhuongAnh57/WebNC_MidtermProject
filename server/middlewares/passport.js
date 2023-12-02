const { ExtractJwt, Strategy } = require('passport-jwt');

const passport = require('passport');

const applyPassportStrategy = (passport) => {
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    };

    passport.use(
        new Strategy(jwtOptions, async (jwt_payload, done) => {
            // passport-jwt already verified the signature. We can now use the jwt_payload
            return done(null, jwt_payload);
        }),
    );
        
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // passport.deserializeUser((user, done) => {
    //     done(null, user);
    // });
};

module.exports = { applyPassportStrategy, passport };
