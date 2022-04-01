const { getDatabase } = require("firebase-admin/database");


const userCollection = userId => {
    const db = getDatabase();
    if (userId) {
        return db.ref(`server/tulsee/users/${userId}`);
    }else{
        return db.ref('server/tulsee/users');

    }
    // const taskRef = ref.child('tasks')
}

module.exports = {
    userCollection
}