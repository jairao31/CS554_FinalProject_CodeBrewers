const express = require('express');
const { getDatabase } = require('firebase-admin/database');
const { v4 } = require('uuid');
const { taskCollection } = require('../data/Refs');
const router = express.Router();

router.post('/', async(req,res) => {
    try {
        const {projectId, title, description, assignee, createdBy} = req.body;
        if(!projectId || !title || !description || !assignee || !createdBy) {
            res.status(401).json({error:'Insufficient Funds'})
            return
        }
        if(typeof projectId !== "string" || typeof title !== "string" || typeof description !== "string" || typeof assignee !== "string" || typeof createdBy !== "string") {
            res.status(401).json({error:'Invalid data type'})
            return
        }

        const taskData = {
            publicId: v4(),
            projectId,
            title,
            description,
            assignee,
            createdBy,
            status: 0,
            comments:[],
            createdOn: new Date().toISOString()
        }

        taskCollection(taskData.publicId).set(taskData, error => {
            if(error) {
                res.status(500).json({error: "Task could not be added"})
            }else{
                res.json('Task was added successfully');
            }
        })
        
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

router.get('/project/:projectId', async(req,res) => {
    try {
        const {projectId} = req.params;
        taskCollection().orderByChild("projectId").equalTo(projectId).once('value', (snapshot) => {
            let result = []
            for (var key in snapshot.val()) {
                result.push(snapshot.val()[key])
            }
            if(result.length === 0) {
                res.status(500).json({error: 'Task could not be found for the given project ID'});
                return;
            }
            res.json(result)
        })
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

router.get('/:taskId', async(req,res) => {
    try {
        const {taskId} = req.params;
        taskCollection(taskId).once('value', (snapshot) => {
            if(snapshot.val()) {
                res.json(snapshot.val())
            }else{
                res.status(500).json({error: 'task could not be found for the given task ID'});
                return;
            }
        })
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

router.patch('/:taskId', async(req,res) => {
    try {
        const {taskId} = req.params;
        const request = req.body;
        taskCollection(taskId).update(request, error => {
            if(error) {
                res.status(500).json({error:'Task could not be updated'})
            }else{
                res.json('Task was updated successfully')
            }
        })
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

module.exports = router