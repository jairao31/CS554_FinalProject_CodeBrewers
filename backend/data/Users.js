const { getDatabase } = require('firebase-admin/database');
const { userCollection } = require('./UserRefs');
const bcrypt = require("bcryptjs");
const saltRounds = 16;

// "isPassword" function for password authentication
function isPassword(str) {
    if (!str) throw `Password must be provided`;
    if (typeof str != "string") throw `Password must be a string`;
    if (str.trim().length == 0) throw `Password cannot just be empty spaces`;
    if (str.toLowerCase().trim() != str.toLowerCase().trim().replace(/\s+/g, ""))
      throw `Password cannot have spaces`;
    let strippedStr = str.toLowerCase().trim().replace(/\s+/g, "");
    if (strippedStr.length < 6) throw `Password must be at least six characters`;
}

// "CreateUser" function for new User Registration
// const CreateUser = async(userName, password, profilePhotoUrl, firstName, lastName, skills, requests, projects, completedProjects, createdOn, lastActive, isActive) => {
//     if(!userName ||!password || !firstName || !lastName) throw "Insufficient fields"
//     if(typeof userName !== "string" || typeof firstName !== "string" || typeof lastName !== "string") throw "Invalid data"
//     //userName, profilePhotoUrl, firstName, lastName, skills, requests, projects, completedProjects, createdOn, lastActive, isActive
//     isPassword(password);
//     // const data= await getUserList(userName);
//     const hash = await bcrypt.hash(password, saltRounds)
//     const userData = {
//         userName: userName.trim(), 
//         password: hash,
//         profilePhotoUrl:profilePhotoUrl || null, 
//         firstName: firstName.trim(), 
//         lastName: lastName.trim(), 
//         skills: skills || null, 
//         requests: requests || null, 
//         projects: projects || null, 
//         completedProjects: completedProjects, 
//         createdOn: new Date().toISOString(), 
//         lastActive: new Date().toISOString(), 
//         isActive: true
//     }
    
//     userCollection().orderByChild("userName").equalTo(userName).on('value', (snapshot) => {
//         var userNameFlag=false
//         let result = []
//         for (var key in snapshot.val()) {
//             result.push(snapshot.val()[key])
//         }
//         // if (result.length>1)
//         if (result.length>=1){
//             userNameFlag=true
//             throw("This username is already taken. Please choose another username.")
//         }else{
//             // const db = getDatabase();
//             // const ref = db.ref('server/tulsee');
//             // const taskRef = ref.child('users')
//             // taskRef.push().set(userData)
//         }
//         //if (userNameFlag){throw('bad')}

//     })

//     //CHECK  whether there is already a user with that username?

 
// }


// const getUserList = async(userName) => {
//     if(!userName) throw "Please provide a userName"
//     if(typeof userName !== "string" || userName === "") throw "Invalid request"
//     userCollection().orderByChild("userName").equalTo(userName).on('value', (snapshot) => {
//         let result = []
//         for (var key in snapshot.val()) {
//             result.push(snapshot.val()[key])
//         }

//     })
//     // const output = await Promise.resolve(result);
//     // const realOP = await output();
//     // console.log(realOP)
//     // console.log(output.result)
//     // return output
// }

module.exports = {
   // CreateUser,
    // getUserList
}