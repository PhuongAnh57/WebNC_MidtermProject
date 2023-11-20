const db = require('../configs/database');

module.exports = {
    getAllUsers: async () => {
        const result = await db.any('SELECT * FROM accounts ORDER BY user_id ASC');
        return result;
    },
    getUserByID: async (id) => {
        const result = await db.one('SELECT * FROM accounts WHERE id=$1', [id]);
        return result;
    },
    getUserByEmail: async (email) => {
        const result = await db.one('SELECT * FROM accounts WHERE email=$1', [email]);
        return result;
    },
    getUserByUsername: async (username) => {
        const result = await db.one('SELECT * FROM accounts WHERE username=$1', [username]);
        return result;
    },
    addNewUser: async (user) => {
        const result = await db.one(
            'INSERT INTO accounts(user_id, first_name, last_name, username, password, email, address) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [user.id, user.firstName, user.lastName, user.username, user.password, user.email, user.address],
        );

        return result;
    },
};
