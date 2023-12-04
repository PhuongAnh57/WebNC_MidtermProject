const db = require('../configs/database');

module.exports = {
    getAllUsers: async () => {
        const result = await db.any('SELECT * FROM pending_users ORDER BY user_id ASC');
        return result;
    },
    getUserByID: async (id) => {
        const result = await db.one('SELECT * FROM pending_users WHERE user_id=$1', [id]);
        return result;
    },
    getUserByEmail: async (email) => {
        const result = await db.one('SELECT * FROM pending_users WHERE email=$1', [email]);
        return result;
    },
    getUserByUsername: async (username) => {
        const result = await db.one('SELECT * FROM pending_users WHERE username=$1', [username]);
        return result;
    },
    getUserByToken: async (token) => {
        const result = await db.one('SELECT * FROM pending_users WHERE verify_token=$1', [token]);
        return result;
    },
    addNewUser: async (user) => {
        const result = await db.one(
            'INSERT INTO pending_users(user_id,  username, password, first_name, last_name, email, verify_token) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [user.id, user.username, user.password, user.firstName, user.lastName, user.email, user.verifyToken],
        );

        return result;
    },
    removeUser: async (id) => {
        await db.none('DELETE FROM pending_users WHERE user_id=$1', [id]);
    },
};
