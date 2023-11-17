const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const flash = require('connect-flash');

const router = require('./router/router.r');

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
app.use(flash);

dotenv.config();

app.use((err, req, res, next) => {
    res.locals.message = req.flash('message');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
