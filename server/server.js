const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

const router = require('./router/router.r');
const { applyPassportStrategy, passport } = require('./middlewares/passport');

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
app.use(passport.initialize());
app.use(passport.session());
applyPassportStrategy(passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;
