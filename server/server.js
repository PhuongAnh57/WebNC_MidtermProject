const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
