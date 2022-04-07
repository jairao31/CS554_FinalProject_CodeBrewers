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
            createdOn: new Date().toISOString()
        }

        const db = getDatabase();
        const ref = db.ref('server/tulsee');
        const taskRef = ref.child('projects')
        taskRef.push().set(projectData, error => {
            if(error) {
                res.status(500).json({error: "Project could not be added"})
            }else{
                res.json('Project was added successfully');
            }
        })
    }catch(error){
        res.status(500).json({error: error.message ?error.messsage: error});
    }
});

//get all projects
router.get('/',async(req,res)=>{
    try {
        projectCollection().on('value', (snapshot) => {
            let result = []
            for (var key in snapshot.val()) {
                result.push({id: key, ...snapshot.val()[key]})
            }
            res.json(result)
        });
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
});

//get project by id
router.get('/:projectId',async(req,res)=>{
    try {
        const {projectId} = req.params;
        projectCollection(projectId).once('value', (snapshot) => {
            console.log(snapshot.val())
            if (snapshot.val()){
                res.json({id:projectId,...snapshot.val()})
            }else{
                res.status(500).json({error: "Project not found"})
            }
        });
    } catch (error) {
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
                res.status(500).json({error:'Project could not be updated'})
            }else{
                res.json('Project was updated successfully')
            }
        });
    } catch (error) {
        res.status(500).json({error: error.message ? error.messsage: error})
    }
});

module.exports= router