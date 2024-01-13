const classM = require('../models/class.m');
const resourceM = require('../models/resource.m');
const userM = require('../models/user.m');

exports.getMembersByRole = async (req, res) => {
    const { role } = req.params;

    try {
        let userAccountsData;
        if (role == 'all') {
            userAccountsData = await userM.getAllUsers();
        } else if (role == 'teacher') {
            userAccountsData = await userM.getTeachers();
            res.json({ message: role, userAccountsData });
        } else if (role == 'student') {
            userAccountsData = await userM.getStudents();
            res.json({ message: role, userAccountsData });
        }
        res.json({ message: 'All members', userAccountsData });
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
        const list_classID = classes_members.filter((c) => c.member_id === +userID).map((c) => c.class_id);

        const classes = await classM.getAllClasses();
        const classesOfUser = classes.filter((c) => list_classID.includes(c.class_id));

        res.json({ message: "User account and user's classes", userAccountData, classesOfUser });
    } catch (error) {
        console.log(error);
    }
};

exports.deleteMemberByID = async (req, res) => {
    const { userID } = req.params;
    try {
        const userDB = await userM.getUserByID(userID);
        if (!userDB) {
            console.log('User not found');
            res.status(400).json({ message: 'User not found' });
        }

        const ownedClasses = await classM.getOwnedClasses(userID);

        if (ownedClasses) {
            [...ownedClasses].forEach(async (ownedClass) => {
                const classID = ownedClass.class_id;
                const deleteResource = async (classID) => await resourceM.removeResourceInClass(classID);
                const deleteMember = async (classID) => await classM.removeMembersInClass(classID);
                const deleteClass = async (classID) => await classM.removeClass(classID);

                await Promise.all([deleteResource(classID), deleteMember(classID), deleteClass(classID)]);
            });
        }

        const joinedClasses = await classM.getJoinedClasses(userID);

        // console.log(joinedClasses);
        if (joinedClasses) {
            [...joinedClasses].forEach(async (joinedClasses) => {
                const classID = joinedClasses.class_id;
                await classM.removeMemberInClass(classID, userID);
            });
        }

        await userM.removeUser(userID);

        res.json({ message: 'Delete user account successfully' });
    } catch (error) {
        console.log(error);
    }
};
