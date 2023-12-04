const db = require('../configs/database');

module.exports = {
    getAllTokens: async () => {
        const result = await db.any('SELECT * FROM access_tokens ORDER BY user_id ASC');
        return result;
    },
    getTokenByID: async (id) => {
        const result = await db.one('SELECT * FROM access_tokens WHERE user_id=$1', [id]);
        return result;
    },
    getTokenByToken: async (token) => {
        const result = await db.one('SELECT * FROM access_tokens WHERE token=$1', [token]);
        return result;
    },
    addNewToken: async (token) => {
        const result = await db.one('INSERT INTO access_tokens(user_id, token) VALUES($1, $2) RETURNING *', [
            token.user_id,
            token.token,
        ]);

        return result;
    },
    removeToken: async (id) => {
        await db.none('DELETE FROM access_tokens WHERE user_id=$1', [id]);
    },
};
