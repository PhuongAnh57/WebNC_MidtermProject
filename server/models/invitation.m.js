const db = require('../configs/database');

module.exports = {
    getAllClasses: async () => {
        const result = await db.any('SELECT * FROM invitations');
        return result;
    },
    getInvitationByEmail: async (email) => {
        const result = await db.one('SELECT * FROM invitations WHERE email=$1', [email]);
        return result;
    },
    getInvitationByToken: async (token) => {
        const result = await db.one('SELECT * FROM invitations WHERE accept_token=$1', [token]);
        return result;
    },
    addNewInvitation: async (invitation) => {
        await db.one('INSERT INTO invitations(email, accept_token) VALUES($1, $2) RETURNING *', [
            invitation.email,
            invitation.token,
        ]);
    },
    //     return result;
    // },
    // removeToken: async (id) => {
    //     await db.none('DELETE FROM access_tokens WHERE user_id=$1', [id]);
    // },
};
