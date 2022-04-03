const { getDatabase } = require('firebase-admin/database');
const { taskCollection } = require('./Refs');

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
    taskRef.push().set(taskData)
}

const getTaskList = async(projectId) => {
    if(!projectId) throw "Please provide a project ID"
    if(typeof projectId !== "string" || projectId === "") throw "Invalid request"
    taskCollection().orderByChild("projectId").equalTo(projectId).on('value', (snapshot) => {
        let result = []
        for (var key in snapshot.val()) {
            result.push(snapshot.val()[key])
        }
        // console.log(result)
        return result
    })
    // const output = await Promise.resolve(result);
    // const realOP = await output();
    // console.log(realOP)
    // console.log(output.result)
    return output
}

module.exports = {
    CreateTask,
    getTaskList
}