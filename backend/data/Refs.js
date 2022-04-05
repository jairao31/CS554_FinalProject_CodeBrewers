const { getDatabase } = require("firebase-admin/database");

const taskCollection = taskId => {
    const db = getDatabase();
    if (taskId) {
        return db.ref(`server/tulsee/tasks/${taskId}`);
    }else{
        return db.ref('server/tulsee/tasks');
    }
    // const taskRef = ref.child('tasks')
}

const skillCollection = skillId => {
    const db = getDatabase();
    if (skillId) {
        return db.ref(`server/tulsee/skills/${skillId}`);
    }else{
        return db.ref('server/tulsee/skills');

    }
}

const userCollection = () => {
    const db = getDatabase();
    if (userId) {
        return db.ref(`server/tulsee/users/${userId}`);
    }else{
        return db.ref('server/tulsee/users');
    }
}

module.exports = {
    taskCollection,
    userCollection,
    skillCollection
}