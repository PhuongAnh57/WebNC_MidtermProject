const db = require('../configs/database');

module.exports = {
    getAllUsers: async () => {
        const result = await db.any('SELECT * FROM accounts');
        return result;
    },
    getUserByEmail: async (email) => {
        const result = await db.one('SELECT FROM accounts WHERE email=$1', [email]);
        return result;
    },
    getUserByUsername: async (username) => {
        const result = await db.one('SELECT FROM accounts WHERE username=$1', [username]);
        return result;
    },
};
