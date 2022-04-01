const { getDatabase } = require('firebase-admin/database');
//const { taskCollection } = require('./Refs');
const bcrypt = require("bcryptjs");
const saltRounds = 16;

function isPassword(str) {
    if (!str) throw `Password must be provided`;
    if (typeof str != "string") throw `Password must be a string`;
    if (str.trim().length == 0) throw `Password cannot just be empty spaces`;
    if (str.toLowerCase().trim() != str.toLowerCase().trim().replace(/\s+/g, ""))
      throw `Password cannot have spaces`;
    let strippedStr = str.toLowerCase().trim().replace(/\s+/g, "");
    if (strippedStr.length < 6) throw `Password must be at least six characters`;
}

const CreateUser = async(userName, password, profilePhotoUrl, firstName, lastName, skills, requests, projects, completedProjects, createdOn, lastActive, isActive) => {
    if(!userName ||!password || !firstName || !lastName) throw "Insufficient fields"
    if(typeof userName !== "string" || typeof firstName !== "string" || typeof lastName !== "string") throw "Invalid data"
    userName, profilePhotoUrl, firstName, lastName, skills, requests, projects, completedProjects, createdOn, lastActive, isActive
    isPassword(password);
    //CHECK  whether there is already a user with that username?
    const hash = await bcrypt.hash(password, saltRounds)
    const userData = {
        userName: userName.trim(), 
        password: hash,
        profilePhotoUrl:"", 
        firstName: firstName.trim(), 
        lastName: lastName.trim(), 
        skills:[], 
        requests:[], 
        projects:[], 
        completedProjects:[], 
        createdOn: new Date().toISOString(), 
        lastActive: new Date().toISOString(), 
        isActive: true
    }
    const db = getDatabase();
    const ref = db.ref('server/tulsee');
    const taskRef = ref.child('users')
    taskRef.push().set(userData)
}

const checkPass= async(passedPass, mypassword)=>{
    let compare = false;
    try {
      const compare = await bcrypt.compare(passedPass, mypassword);
      console.log(compare)
    } catch (e) {
        console.log(e)
    }
    //BCRYPT not working
    if (compare) {
        return true;
    } else {
        return false;
    }
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
    CreateUser,
    checkPass
    //getTaskList
}