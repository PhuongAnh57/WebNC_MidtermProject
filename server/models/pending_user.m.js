const db = require('../configs/database');

module.exports = {
    getAllUsers: async () => {
        const result = await db.any('SELECT * FROM pending_users ORDER BY user_id ASC');
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
    addNewUser: async (user) => {
        const result = await db.one(
            'INSERT INTO pending_users(user_id,  username, password, first_name, last_name, gender, email, day_of_birth, address) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [
                user.id,
                user.username,
                user.password,
                user.firstName,
                user.lastName,
                user.gender,
                user.email,
                user.dob,
                user.address,
            ],
        );

        return result;
    },
    editUser: async (user) => {
        await db.none(
            'UPDATE pending_users SET first_name=$1, last_name=$2, day_of_birth=$3, gender=$4, email=$5, address=$6 WHERE user_id=$7',
            [user.firstName, user.lastName, user.dayOfBirth, user.gender, user.email, user.address, user.userID],
        );
    },
};
