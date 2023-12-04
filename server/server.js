const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const router = require('./router/router.r');

const passportGoogleOauth20 = require('./middlewares/passport-google');
const passportFacebook = require('./middlewares/passport-facebook');

const { applyPassportStrategy, passport } = require('./middlewares/passport');
const bodyParser = require('body-parser');

app.use(
    session({
        secret: 'session secret',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    }),
);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }),
);
app.use(cookieParser());
app.use(router);

dotenv.config();

// use middlewares
app.use(passport.initialize());
app.use(passport.session());
applyPassportStrategy(passport);

//----------------------------------------------------------------
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'], prompt: 'consent' }));

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
    (req, res) => {
        //console.log(req.user);
        res.cookie('accessToken', req.user.accessToken);
        res.cookie('user', JSON.stringify(req.user.u));

        res.redirect('http://localhost:3000/home');
    },
);
//----------------------------------------------------------------
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile'] }));

app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/login' }),
    (req, res) => {
        // console.log(req.user);
        res.cookie('accessToken', req.user.accessToken);
        res.cookie('user', JSON.stringify(req.user.u));

        res.redirect('http://localhost:3000/home');
    },
);
//----------------------------------------------------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;
