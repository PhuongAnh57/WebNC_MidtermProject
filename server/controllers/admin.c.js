const classM = require('../models/class.m');
const resourceM = require('../models/resource.m');
const userM = require('../models/user.m');

// ---------------------------------------- Manage user accounts---------------------------------------------------

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
            [...joinedClasses].forEach(async (joinedClass) => {
                const classID = joinedClass.class_id;
                await classM.removeMemberInClass(classID, userID);
            });
        }

        await userM.removeUser(userID);

        res.json({ message: 'Delete user account successfully' });
    } catch (error) {
        console.log(error);
    }
};

// ---------------------------------------- Manage classes---------------------------------------------------

exports.getClassesBySortType = async (req, res) => {
    const { sortType } = req.params;

    try {
        const classes = await classM.getAllClasses();

        if (sortType === 'asc') {
            const classes_asc = classes.slice().sort((x, y) => x.class_name.localeCompare(y.class_name));
            res.json({ message: 'classname by asc', classesData: classes_asc });
        } else if (sortType === 'desc') {
            const classes_desc = classes.slice().sort((x, y) => y.class_name.localeCompare(x.class_name));
            res.json({ message: 'classname by desc', classesData: classes_desc });
        } else {
            res.json({ message: 'all classes', classesData: classes });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.getClassesByKeyWord = async (req, res) => {
    const { sortType, keyword } = req.params;

    try {
        const classes = await classM.getAllClasses();
        let classesData = [];

        if (sortType === 'asc') {
            const classes_asc = classes.slice().sort((x, y) => x.class_name.localeCompare(y.class_name));
            classesData = classes_asc.filter((c) => c.class_name.includes(keyword));
            res.json({ message: 'classname by asc', classesData });
        } else if (sortType === 'desc') {
            const classes_desc = classes.slice().sort((x, y) => y.class_name.localeCompare(x.class_name));
            classesData = classes_desc.filter((c) => c.class_name.includes(keyword));
            res.json({ message: 'classname by desc', classesData });
        } else {
            classesData = classes.filter((c) => c.class_name.includes(keyword));
            res.json({ message: 'all classes', classesData });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.getClassByID = async (req, res) => {
    const { classID } = req.params;

    try {
        // console.log(classID);
        // const Class = await classM.getClassByID(classID);
        // const users = await userM.getAllUsers();
        // const owner = await userM.getUserByID(Class.lecturer_id);
        // const members = await classM.getAllMembersInClass(classID);

        // const lecturers = members.filter(m => m.role === 'teacher');
        // const students = members.filter(m => m.role === 'student');

        // const list_lecturers = users.filter(u => u.user_id.includes(lecturers.member_id));
        // const list_students = users.filter(u => u.user_id.includes(students.member_id));

        const Class = await classM.getClassByID(classID);
        const users = await userM.getAllUsers();
        const owner = await userM.getUserByID(Class.lecturer_id);
        const members = await classM.getAllMembersInClass(classID);

        const lecturers = members.filter((m) => m.role === 'teacher');
        const students = members.filter((m) => m.role === 'student');

        const list_lecturers = users.filter((u) => lecturers.map((lec) => lec.member_id).includes(u.user_id));
        const list_students = users.filter((u) => students.map((std) => std.member_id).includes(u.user_id));

        const classInfo = {
            class_id: Class.class_id,
            class_name: Class.class_name,
            part: Class.part,
            topic: Class.topic,
            room: Class.room,
            owner: `${owner.last_name} ${owner.first_name}`,
            numberOfLecturers: lecturers.length,
            numberOfStudents: students.length,
        };
        // console.log(classInfo);
        // console.log(list_lecturers);
        // console.log(list_students);

        res.json({ message: 'Class and members of this class', classInfo, list_lecturers, list_students });
    } catch (error) {
        console.log(error);
    }
};
