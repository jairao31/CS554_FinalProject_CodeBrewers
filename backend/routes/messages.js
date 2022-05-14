const express = require('express');
const { messageCollection } = require('../data/Refs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();


router.post('/:projectId', (req,res) => {
    try {
        const {text, sender } = req.body
        const {projectId} = req.params;

        if(!text || !sender || !projectId) {
            res.status(400).json({error: "Insufficient inputs"});
            return
        }

        if(typeof text !== "string" || typeof sender !== "object" || typeof projectId !== "string") {
            res.status(400).json({error: "Invalid inputs"});
            return
        }

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
        const {projectId} = req.params
        
        if(!projectId) {
            res.status(400).json({error: "Please provide a project ID"});
            return
        }

        messageCollection(projectId).once('value', snapshot => {
            if(snapshot.val()) {
                console.log(snapshot.val())
                // let allMessages = snapshot.val()[Object.keys(snapshot.val())[0]]
                let result = []
                for (var key in snapshot.val()) {
                    result.push(snapshot.val()[key])
                }
                res.json(result)
            }else{
                res.status(500).json({error: 'messages could not be found for the given project ID'});
                return;
            }
        })
    } catch (error) {
        res.status(500).json({error: error.message ? error.message : "Internal Server Error"})
    }
})

module.exports = router