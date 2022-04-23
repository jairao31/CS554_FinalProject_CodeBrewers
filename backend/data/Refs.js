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
    }else{
        return db.ref('server/tulsee/users');
    }
}

const projectCollection = () => {
    const db = getDatabase();
    if (projectId) {
        return db.ref(`server/tulsee/projects/${projectsId}`);
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
<<<<<<< HEAD
  taskCollection,
  userCollection,
  skillCollection,
  projectCollection,
  mediaCollection,
};
=======
    taskCollection,
    userCollection,
    skillCollection,
    projectCollection,
    messageCollection
}
>>>>>>> 3d2988c781926872408e7b7a3d1e9dd53b4fd57e
