const db = require('../configs/database');

module.exports = {
    getAllInvitations: async () => {
        const result = await db.any('SELECT * FROM invitations');
        return result;
    },
    getInvitationByEmail: async (classID, email) => {
        const result = await db.one('SELECT * FROM invitations WHERE class_id=$1 and email=$2', [classID, email]);
        return result;
    },
    getInvitationByToken: async (token) => {
        const result = await db.one('SELECT * FROM invitations WHERE accept_token=$1', [token]);
        return result;
    },
    addNewInvitation: async (invitation) => {
        await db.one(
            'INSERT INTO invitations(email, class_id, role, accept_token) VALUES($1, $2, $3, $4) RETURNING *',
            [invitation.email, invitation.classID, invitation.role, invitation.token],
        );
    },
    removeInvitation: async (email) => {
        await db.none('DELETE  FROM invitations WHERE email=$1', [email]);
    },
};
