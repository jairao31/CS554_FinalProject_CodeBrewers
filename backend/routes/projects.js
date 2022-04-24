const express=require('express');
const { getDatabase } = require('firebase-admin/database');
const { projectCollection } = require('../data/Refs');
const router=express.Router();
// let project = require('../data/Projects');

// Project = {projectPublicId : string
//     name: string,
//     participants:[userPublicId],
//     type: string,
//     chatRoomId: string,
//     createdOn: dateString,
//     createdBy: userPublicId}

//route to create project
router.post('/',async(req,res)=>{
    try{

        const {name, participants, type, chatRoomId, createdBy} = req.body;
        if(!name || !participants || !type || !chatRoomId || !createdBy) {
            res.status(401).json({error:'Insufficient Funds'})
            return
        }
        if(typeof name !== "string" || typeof type !== "string" || typeof chatRoomId !== "string" || typeof createdBy !== "string") {
            res.status(401).json({error:'Invalid data type'})
            return
        }

        const projectData = {
            name: name,
            participants: participants,
            type: type,
            chatRoomId: chatRoomId,
            createdBy: createdBy,
            createdOn: new Date().toISOString(),
            archived: false
        }
        projectCollection().off('value');
        projectCollection().push().set(projectData, error => {
            if(error) {
                res.status(500).json({error: "Project could not be added"})
            }else{
                res.json({sucess:'Project was added successfully'});
            }
        })
    }catch(error){
        res.status(500).json({error: error.message ?error.messsage: error});
    }
});

//get all projects
//by userId
router.get('/byUser/:userId',async(req,res)=>{
    try {
        const {userId} = req.params;
        projectCollection().once('value', (snapshot) => {
            let result = []
            for (var key in snapshot.val()) {
                let exist = snapshot.val()[key].participants.find(i => i === userId)
                if(exist)  result.push({id: key, ...snapshot.val()[key]});
            }
            projectCollection().off('value');
            res.json(result)
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message ?error.messsage: error})
    }
});

//get project by id
router.get('/:projectId',async(req,res)=>{
    try {
        // console.log("inside the projecid route");
        const {projectId} = req.params;
        // console.log(req.params);
        projectCollection(projectId).once('value', (snapshot) => {
            console.log(snapshot.val());
            console.log("inside query");
            if (snapshot.val()){
                // projectCollection().off('value');
                console.log('value found');
                res.json({id:projectId,...snapshot.val()});
            }else{
                console.log(error);
                res.status(500).json({error: "Project not found for the given id"});
                return;
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message ?error.messsage: error})
    }
});

//route to edit/patch projects
router.patch('/:projectId', async(req,res) => {
    try {
        const {projectId} = req.params;
        const request = req.body;
        projectCollection(projectId).update(request, error => {
            if(error) {
                res.status(500).json({error:'Project could not be updated'});
            }else{
                console.log("Project updated successfully");
                res.json('Project was updated successfully');
            }
        });
    } catch (error) {
        console.log('no such route');
        res.status(500).json({error: error.message ? error.messsage: error});
    }
});

module.exports= router