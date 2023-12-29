const db = require('../configs/database');

module.exports = {
    getAllUsers: async () => {
        const result = await db.any('SELECT * FROM accounts ORDER BY user_id ASC');
        return result;
    },
    getUserByID: async (id) => {
        const result = await db.one('SELECT * FROM accounts WHERE user_id=$1', [id]);
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
    getUserByToken: async (token) => {
        const result = await db.one('SELECT * FROM accounts WHERE verify_token=$1', [token]);
        return result;
    },
    addNewUser: async (user) => {
        const result = await db.one(
            'INSERT INTO accounts(user_id,  username, password, first_name, last_name, gender, email, date_of_birth, address, verify_token) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [
                user.id,
                user.username,
                user.password,
                user.first_name,
                user.last_name,
                user.gender,
                user.email,
                user.dateOfBirth,
                user.address,
                user.verify_token,
            ],
        );

        return result;
    },
    editUser: async (user) => {
        await db.none(
            'UPDATE accounts SET first_name=$1, last_name=$2, date_of_birth=$3, gender=$4, email=$5, address=$6 WHERE user_id=$7',
            [user.first_name, user.last_name, user.date_of_birth, user.gender, user.email, user.address, user.user_id],
        );
    },
    editPassword: async (user) => {
        await db.none('UPDATE accounts SET password=$1 WHERE user_id=$2', [user.password, user.user_id]);
    },
};
