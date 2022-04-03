const express=require('express');
const { getDatabase } = require('firebase-admin/database');
const { projectCollection } = require('../data/Refs');
const router=express.Router();
let project = require('../data/Projects');

router.post('/',async(req,res)=>{
    try{
        const{name,participants,type,chatRoomId,userPublicId}=req.body;
        project.createProject(name,participants,type,chatRoomId,userPublicId);
        res.json('Project successfully created');

    }catch(error){
        res.status(500).json({error: error.message ?error.messsage: error});
    }
});

router.get('/',async(req,res)=>{
    try {
        projectCollection().once('value', (snapshot) => {
            res.json(snapshot.val);
        });
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
});

router.get('/:projectId',async(req,res)=>{
    try {
        const {projectId} = req.params;
        console.log(projectId)
        projectCollection(projectId).once('value', (snapshot) => {
            res.json({id:projectId,...snapshot.val()})
        });
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
});

module.exports= router