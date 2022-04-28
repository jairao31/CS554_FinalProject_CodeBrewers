const express = require('express');
const { getDatabase } = require('firebase-admin/database');
const { userCollection } = require('../data/Refs');
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4 } = require('uuid');
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
        const {publicId, password, firstName, lastName, email} = req.body;
        isPassword(password);
        userCollection().orderByChild("email").equalTo(email).on('value', (snapshot) => {
            try {
                // console.log('entered')
                let result = []
                userCollection().off('value');
                for (var key in snapshot.val()) {
                    result.push({id: key, ...snapshot.val()[key]})
                }
                if (result.length>=1){
                    res.status(404).json("An account with this email already exists. Please try logging in.")
                }else{
                    const userData = {
                        publicId,
                        profilePhotoUrl:null, 
                        firstName: firstName.trim(), 
                        lastName: lastName.trim(),
                        displayName: firstName.trim()[0].toUpperCase() + firstName.trim().slice(1),
                        email: email.trim(),
                        skills: [], 
                        requests: [], 
                        projects: [], 
                        completedProjects: [], 
                        createdOn: new Date().toISOString(), 
                        lastActive: null, 
                        isActive: false
                    }
                    userCollection(userData.publicId).set(userData, error => {
                        if(error) {
                            res.status(500).json({error: 'User could not be registered!'})
                        }else{
                            res.json(userName+' successfully Registered');
                        }
                    })
                }
                
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
router.get('/login/:publicId',async(req,res)=>{
    try{
        const {publicId} = req.params;
        userCollection(publicId).once('value', (snapshot) => {
            try {
                
                if (!snapshot.val()){
                    res.status(404).json("No username found")
                }else{
                    res.json(snapshot.val());
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

router.get("/autoComplete/:query", async(req,res) => {
    const {query} = req.params
    userCollection().orderByChild('firstName').startAt(query).endAt(query + '\uf8ff').once('value',snapshot => {
        let result = []
        for(key in snapshot.val()){
            if(snapshot.val()[key].firstName.indexOf(query) === 0) {
                const {displayName, publicId} = snapshot.val()[key]
                result.push({
                    displayName, publicId
                })
            }
          }
        res.json(result)
    })
})

router.get("/logout", async (req, res) => {
    req.session.destroy();
    res.json({loggedOut: true})
  });

module.exports = router