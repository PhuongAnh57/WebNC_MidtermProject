const initOptions = {};
const pgp = require('pg-promise')(initOptions);

const connection = {
    host: 'localhost',
    port: '5432',
    user: 'postgre',
    password: '20120275',
    database: 'ClothingStore',
};

const db = pgp(connection);

module.exports = db;
