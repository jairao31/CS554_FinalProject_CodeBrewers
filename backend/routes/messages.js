const express = require('express');
const { getDatabase } = require('firebase-admin/database');
const { messageCollection } = require('../data/Refs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();


router.post('/:projectId', (req,res) => {
    try {
        const {text, sender } = req.body
        const {projectId} = req.params;
        console.log(projectId)
        const requestBody = {
            publicId:uuidv4(),
            text,
            sender,
            createdAt: new Date().toISOString()
        }
        messageCollection(projectId).push().set(requestBody, error => {
            if(error) {
                res.status(500).json({error: "message could not be sent"})
            }else{
                res.json(requestBody);
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message ? error.message : "Internal Server Error"})
    }
});

router.get("/:projectId", (req,res) => {
    try {
        const {projectId} = req.body
        messageCollection(projectId).once('value', snapshot => {
            if(snapshot.val()) {
                let allMessages = snapshot.val()[Object.keys(snapshot.val())[0]]
                let result = []
                for (var key in allMessages) {
                    result.push(allMessages[key])
                }
                res.json(result)
            }else{
                res.status(500).json({error: 'messages could not be found for the given project ID'});
                return;
            }
        })
    } catch (error) {
        log(error)
        res.status(500).json({error: error.message ? error.message : "Internal Server Error"})
    }
})

module.exports = router