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

const mediaCollection = (mediaId) => {
  const db = getDatabase();
  if (mediaId) {
    return db.ref(`server/tulsee/media/${mediaId}`);
  } else {
    return db.ref("server/tulsee/media");
  }
};

const userCollection = (userId) => {
  const db = getDatabase();
  if (userId) {
    return db.ref(`server/tulsee/users/${userId}`);
  } else {
    return db.ref("server/tulsee/users");
  }
};

const projectCollection = () => {
    const db = getDatabase();
    if (projectId) {
        return db.ref(`server/tulsee/projects/${projectsId}`);
    }else{
        return db.ref('server/tulsee/projects');
    }
}

module.exports = {
  taskCollection,
  userCollection,
  skillCollection,
  projectCollection,
  mediaCollection,
};