const express = require('express');
const { getDatabase } = require('firebase-admin/database');
const { userCollection } = require('../data/Refs');
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 12;

// "isPassword" function used to check pass
function isPassword(str) {
    if (!str) throw `Password must be provided`;
    if (typeof str != "string") throw `Password must be a string`;
    if (str.trim().length == 0) throw `Password cannot just be empty spaces`;
    if (str.toLowerCase().trim() != str.toLowerCase().trim().replace(/\s+/g, ""))
      throw `Password cannot have spaces`;
    let strippedStr = str.toLowerCase().trim().replace(/\s+/g, "");
    if (strippedStr.length < 6) throw `Password must be at least six characters`;
}

// "SIGNUP" Router calling "CreateUser"
router.post('/signup', async(req,res) => {
    try {
        const {userName, password, profilePhotoUrl, firstName, lastName, skills, requests, projects, completedProjects, createdOn, lastActive, isActive} = req.body;
        isPassword(password);
        userCollection().orderByChild("userName").equalTo(userName).on('value', (snapshot) => {
            try {
                // console.log('entered')
                let result = []
                for (var key in snapshot.val()) {
                    result.push({id: key, ...snapshot.val()[key]})
                }
                if (result.length>=1){
                    res.status(404).json("This username is already taken. Please choose another username.")
                }else{
                    bcrypt.genSalt(saltRounds, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            const userData = {
                                userName: userName.trim(), 
                                password: hash,
                                profilePhotoUrl:profilePhotoUrl || null, 
                                firstName: firstName.trim(), 
                                lastName: lastName.trim(), 
                                skills: skills || null, 
                                requests: requests || null, 
                                projects: projects || null, 
                                completedProjects: completedProjects, 
                                createdOn: new Date().toISOString(), 
                                lastActive: new Date().toISOString(), 
                                isActive: true
                            }
                            const db = getDatabase();
                            const ref = db.ref('server/tulsee');
                            const taskRef = ref.child('users')
                            taskRef.push().set(userData)
                            res.json(userName+' successfully Registered');
                            
                            
                        });
                    });
                }
                userCollection().off('value');
            } catch (error) {
                console.log(error)
                res.status(500).json({error: error.message ?error.messsage: error})
                console.log(error)
            }
        })
        // res.json('success');
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

// "LOGIN" Router calling "checkPass" and "userCollection"
router.post('/login',async(req,res)=>{
    try{
        const {userName,password} = req.body;
        userCollection().orderByChild("userName").equalTo(userName).on('value', (snapshot) => {
            try {
                let result = []
                for (var key in snapshot.val()) {
                    result.push({id: key, ...snapshot.val()[key]})
                }
                if (result.length===0){
                    res.status(404).json("No username found")
                }else{
                    bcrypt.compare(password, result[0]['password'], (e, output) => {
                        console.log(output)
                        if (output) {
                            console.log('logged IN')
                            res.json( { authenticated: true });
                        }else{
                            res.status(401).json("Invalid Password")
                        }
                    });
                }
            } catch (error) {
                res.status(500).json({error: error.message ?error.messsage: error})
                console.log(error)
            }
            
        })
    }catch(error){
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

// Edit User by userId
router.patch('/:userId', async(req,res) => {
    try {
        const {userId} = req.params;
        const request = req.body;
        // var idToUpdate=task.getUserList(userName);
        userCollection(userId).update(request)
        // console.log(result)
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})


// "searchByUserName" router calling "userCollection"
router.get('/searchByUserName',async(req,res)=>{
    try{
        const {userName} = req.body;
        userCollection().orderByChild("userName").equalTo(userName).on('value', (snapshot) => {
            let result = []
            for (var key in snapshot.val()) {
                result.push({id: key, ...snapshot.val()[key]})
            }
            if (result.length===0){
                res.json("Sorry! No user found with "+userName+" username. Try Again!")
                return;
            }
            res.json(result)
        })
    }catch(error){
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

// "searchByFirstName" router calling "userCollection"
router.get('/searchByFirstName',async(req,res)=>{
    try{
        const {firstName} = req.body;
        userCollection().orderByChild("firstName").equalTo(firstName).on('value', (snapshot) => {
            let result = []
            for (var key in snapshot.val()) {
                result.push({id: key, ...snapshot.val()[key]})
            }
            if (result.length===0){
                res.json("Sorry! No user found with "+firstName+" first name. Try Again!")
                return;
            }
            res.json(result)
        })
    }catch(error){
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

// :projectId in the router
router.patch('/invite/:userId/:projectId', async(req,res) => {
    try {
        const {userId, projectId} = req.params;
        const request = req.body;
        for (var i=0; i< request['requests'].length;i++){
            userCollection(request['requests'][i]).child('requests').push().set(projectId)       
        }

        res.json("Invite Sent to Id/Id's: "+ request['requests'] +" by "+userId)
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})


router.get("/logout", async (req, res) => {
    req.session.destroy();
    res.json({loggedOut: true})
  });

module.exports = router