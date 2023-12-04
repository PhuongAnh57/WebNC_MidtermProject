const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = '991610570349-jpimmhk1l5mao8nnm3o1clfjp74vpkks.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        function (accessToken, refreshToken, profile, done) {
            const payload = {
                accessToken,
                refreshToken,
                u: profile
            }
            done(null, payload);
        }
    ),
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});