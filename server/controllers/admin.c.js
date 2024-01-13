const classM = require('../models/class.m');
const userM = require('../models/user.m');

exports.getMembersByRole = async (req, res) => {
    const { role } = req.params;

    try {
        let userAccountsData = await userM.getAllUsers();

        if (role !== 'all') {
            userAccountsData = userAccountsData.filter((u) => u.role === role);
            res.json({ message: role, userAccountsData });
        } else {
            res.json({ message: 'All members', userAccountsData });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.getMembersByKeyWord = async (req, res) => {
    const { role, keyword, type } = req.params;

    try {
        let userAccountsData = await userM.getAllUsers();

        if (role !== 'all') {
            userAccountsData = userAccountsData.filter((u) => u.role === role);
        }
        if (type !== 'fullname') {
            userAccountsData = userAccountsData.filter((u) => u[type].includes(keyword));
        } else {
            userAccountsData = userAccountsData.filter((u) => {
                const fullname = `${u.last_name} ${u.first_name}`;
                return fullname.includes(keyword);
            });
        }
        res.json({ message: 'All members', userAccountsData });
    } catch (error) {
        console.log(error);
    }
};

exports.getMemberByID = async (req, res) => {
    const { userID } = req.params;

    try {
        const userAccountData = await userM.getUserByID(userID);

        const classes_members = await classM.getAllClass_Members();
        const list_classID = classes_members.filter(c => c.member_id === +userID).map(c => c.class_id);

        const classes = await classM.getAllClasses();
        const classesOfUser = classes.filter(c => list_classID.includes(c.class_id));

        res.json({ message: "User account and user's classes", userAccountData, classesOfUser });
    } catch (error) {
        console.log(error);
    }
};

exports.deleteMemberByID = async (req, res) => {
    const { userID } = req.params;
    try {
        const deleteUserAccount = await userM.removeUser(userID);

        res.json({ message: 'Delete user account successfully' });
    } catch (error) {
        console.log(error);
    }
};
