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

const userCollection = () => {
    const db = getDatabase();
    const ref = db.ref('server/tulsee');
    const userRef = ref.child('users')
    return userRef;
}

module.exports = {
    taskCollection
}