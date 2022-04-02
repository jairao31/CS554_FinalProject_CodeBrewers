const express = require('express');
const { getDatabase } = require('firebase-admin/database');
const { userCollection } = require('../data/UserRefs');
const router = express.Router();
let task = require('../data/Users');
const bcrypt = require("bcrypt");

router.post('/signup', async(req,res) => {
    try {
        const {userName, password, profilePhotoUrl, firstName, lastName, skills, requests, projects, completedProjects, createdOn, lastActive, isActive} = req.body;
        task.CreateUser(userName, password, profilePhotoUrl, firstName, lastName, skills, requests, projects, completedProjects, createdOn, lastActive, isActive);
        res.json('success');
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

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
                    res.json("No username found")
                }
                bcrypt.compare(password, result[0]['password'], (e, output) => {
                    console.log(output)
                    if (output) {
                        console.log('logged IN')
                        res.json( { authenticated: true });
                    }else{
                        console.log(e)
                    }
                });
            } catch (error) {
                res.status(500).json({error: error.message ?error.messsage: error})
                console.log(error)
            }
            
        })
    }catch(error){
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})



module.exports = router