const { getDatabase } = require('firebase-admin/database');

const CreateTask = async(projectId, title, description, assignee, createdBy) => {
    if(!projectId || !title || !description || !assignee || !createdBy) throw "Insufficient fields"
    if(typeof projectId !== "string" || typeof title !== "string" || typeof description !== "string" || typeof assignee !== "string" || typeof createdBy !== "string") throw "Invalid data"

    const taskData = {
        projectId,
        title,
        description,
        assignee,
        createdBy,
        status: 0,
        comments:[],
        createdOn: new Date().toISOString()
    }

    const db = getDatabase();
    const ref = db.ref('server/tulsee');
    const taskRef = ref.child('tasks')
    const result = await taskRef.push().set(taskData);
    console.log(result)
}

module.exports = {
    CreateTask
}