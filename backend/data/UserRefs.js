const { getDatabase } = require("firebase-admin/database");

// Create a "userCollection" to access the user by it's ID from complete "users" collection
const userCollection = userId => {
    const db = getDatabase();
    if (userId) {
        return db.ref(`server/tulsee/users/${userId}`);
    }else{
        return db.ref('server/tulsee/users');
    }
}

module.exports = {
    userCollection
}