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

const skillCollection = (skillId) => {
  const db = getDatabase();
  if (skillId) {
    return db.ref(`server/tulsee/skills/${skillId}`);
  } else {
    return db.ref("server/tulsee/skills");
  }
};

const mediaCollection = (projectId) => {
  const db = getDatabase();
  if (projectId) {
    return db.ref(`server/tulsee/media/${projectId}`);
  } else {
    return db.ref("server/tulsee/media");
  }
};

const userCollection = (userId) => {
    const db = getDatabase();
    if (userId) {
        return db.ref(`server/tulsee/users/${userId}`);
    }else{
        return db.ref('server/tulsee/users');
    }
}

const projectCollection = (projectId) => {
    const db = getDatabase();
    if (projectId) {
        return db.ref(`server/tulsee/projects/${projectId}`);
    }else{
        return db.ref('server/tulsee/projects');
    }
}

const messageCollection = projectId => {
    const db = getDatabase();
    if (projectId) {
        return db.ref(`server/tulsee/messages/${projectId}`);
    }else{
        return db.ref('server/tulsee/messages');
    }
}

module.exports = {
  taskCollection,
  userCollection,
  skillCollection,
  projectCollection,
  mediaCollection,
  messageCollection,
};
