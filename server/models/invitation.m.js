const db = require('../configs/database');

module.exports = {
    getAllInvitations: async () => {
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
        await db.one('INSERT INTO invitations(email, accept_token, role) VALUES($1, $2, $3) RETURNING *', [
            invitation.email,
            invitation.token,
            invitation.role,
        ]);
    },
    //     return result;
    // },
    removeInvitation: async (email) => {
        await db.none('DELETE  FROM invitations WHERE email=$1', [email]);
    },
};
