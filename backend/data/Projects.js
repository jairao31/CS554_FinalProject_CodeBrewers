const { getDatabase } = require('firebase-admin/database');
const { projectCollection } = require('./Refs');

async function createProject(name,participants,type,chatRoomId,userPublicId){
    if(!name || !participants || !type || !chatRoomId || !userPublicId)
        throw('Insufficient fields');

    if(typeof name!=='string' ||typeof type!=='string'||typeof chatRoomId!=='string'||typeof userPublicId!=='string')
        throw('Invalid fields');

    if(!Array.isArray(participants) || participants.length==0){
        throw("Participants field insufficient");
    }

    //add a check to ensure that participants is present in the user Datacase
        
    else {
        participants.forEach(function (element){
            if(typeof element!='string' || element=="")
                throw("Participants is either empty or does not have valid entries");
        });
    }

    const projectData={
        name: name,
        participants: participants,
        type: type,
        chatRoomId: chatRoomId,
        createdOn: new Date().toISOString(),
        userPublicId: userPublicId
    }

    const db = getDatabase();
    const ref = db.ref('server/tulsee');
    const projectRef = ref.child('projects');
    projectRef.push().set(projectData);
}

async function getProjectById(projectId){
    if(!projectId)
        throw ("Please provide a project ID");
    if(typeof projectId !== "string" || projectId === "")
        throw ("Invalid request");

    projectCollection().orderByChild("projectId").equalTo(projectId).on('value', (snapshot) => {
        let result = []
        for (var key in snapshot.val()) {
            result.push(snapshot.val()[key])
        }
        // console.log(result)
        return result
    });
}

async function getAllProjects(){

    projectCollection().orderByChild('projectId').on('value', (snapshot) => {
        let result=[];
        for (var key in snapshot.val()) {
            result.push(snapshot.val()[key])
        }
        return result
    });
}

async function updateProject(){

}

async function deleteProject(){

}

module.exports={
    createProject,
    getProjectById,
    getAllProjects,
    updateProject,
    deleteProject
}