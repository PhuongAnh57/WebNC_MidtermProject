const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const router = require('./router/router.r');

const passportGoogleOauth20 = require('./middlewares/passport-google');
const passportFacebook = require('./middlewares/passport-facebook');

const { applyPassportStrategy, passport } = require('./middlewares/passport');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(
    cors({
        origin: `${process.env.CLIENT_URL}`,
        methods: ['GET', 'POST'],
    }),
);
app.use(cookieParser());
app.use('/api', router);

dotenv.config();

// use middlewares
app.use(
    session({
        secret: 'session secret',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    }),
);
app.use(passport.initialize());
app.use(passport.session());
applyPassportStrategy(passport);

//----------------------------------------------------------------
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'], prompt: 'consent' }));

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
    (req, res) => {
        res.cookie('accessToken', req.user.accessToken);
        res.cookie('user', JSON.stringify(req.user.u));

        res.redirect(`${process.env.CLIENT_URL}/home`);
    },
);

//----------------------------------------------------------------
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile'] }));

app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
    (req, res) => {
        res.cookie('accessToken', req.user.accessToken);
        res.cookie('user', JSON.stringify(req.user.u));

        res.redirect(`${process.env.CLIENT_URL}/home`);
    },
);
//----------------------------------------------------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    // next(createError(404));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;
