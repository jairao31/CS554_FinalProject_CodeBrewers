const express = require('express');
const { getDatabase } = require('firebase-admin/database');
const { userCollection } = require('../data/UserRefs');
const router = express.Router();
let task = require('../data/Users');
const bcrypt = require("bcryptjs");

// "SIGNUP" Router calling "CreateUser"
router.post('/signup', async(req,res) => {
    try {
        const {userName, password, profilePhotoUrl, firstName, lastName, skills, requests, projects, completedProjects, createdOn, lastActive, isActive} = req.body;
        task.CreateUser(userName, password, profilePhotoUrl, firstName, lastName, skills, requests, projects, completedProjects, createdOn, lastActive, isActive);
        res.json('success');
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

// "_P_R_A_T_I_K_"
// userSchema.methods.deleteToken=function(token,cb){
//     var user=this;

//     user.update({$unset : {token :1}},function(err,user){
//         if(err) return cb(err);
//         cb(null,user);
//     })
// }

// "LOGIN" Router calling "checkPass" and "userCollection"
router.post('/login',async(req,res)=>{
    try{
        const {userName,password} = req.body;
        userCollection().orderByChild("userName").equalTo(userName).on('value', (snapshot) => {
            let result = []
            for (var key in snapshot.val()) {
                result.push({id: key, ...snapshot.val()[key]})
            }
            if (result.length===0){
                res.json("No username found")
            }
            if (task.checkPass(password, result[0]['password'])) {
                console.log('logged IN')
                res.json( { authenticated: true });
            } else {
                res.status(500).json({error:error.message ?error.messsage: error})
                //throw `Either the username or password is invalid`;
            }
        })
    }catch(error){
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

router.patch('/:userName', async(req,res) => {
    try {
        const {userName} = req.params;
        const request = req.body;
        var idToUpdate=''
        console.log(task.getUserList(userName))
        console.log("ihfdshfsdfdsjfbgdjfbgjdsbdsfjbgjdf")
        // userCollection(idToUpdate).update(request)
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
            }
            res.json(result)
        })
    }catch(error){
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})


module.exports = router