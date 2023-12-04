const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const router = require('./router/router.r');

const  = require('./middlewares/passport-google');

const { applyPassportStrategy, passport } = require('./middlewares/passport');

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
app.use(router);

dotenv.config();

// use middlewares
app.use(session({ resave: false, saveUninitialized: true, secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());
applyPassportStrategy(passport);

//----------------------------------------------------------------
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
// router.get('/auth/google/callback', passport.authenticate('google', {
//     successRedirect: 'http://localhost:3000/home',
//     failureRedirect: 'http://localhost:3000/login'
// }));

app.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.redirect('http://localhost:3000/login');
        }

        // Xử lý xác thực thành công
        const { accessToken, refreshToken, u } = user;

        res.cookie('accessToken', accessToken);
        res.cookie('user', JSON.stringify(u));

        return res.redirect('http://localhost:3000/home');
    })(req, res, next);
});
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
