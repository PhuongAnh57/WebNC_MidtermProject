const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_APP_ID = '1376278673012967';
const FACEBOOK_APP_SECRET = '55ac5b57db04eb5d1d5c62d864c9673d';

passport.use(
    new FacebookStrategy(
        {
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: '/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'photos'],
        },
        function (accessToken, refreshToken, profile, done) {
            const payload = {
                accessToken,
                refreshToken,
                u: profile,
            };
            done(null, payload);
        },
    ),
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
