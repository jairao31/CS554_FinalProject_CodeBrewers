const express = require('express');
const { getDatabase } = require('firebase-admin/database');
const { taskCollection } = require('../data/Refs');
const router = express.Router();
let task = require('../data/Tasks');

router.post('/', async(req,res) => {
    try {
        const {projectId, title, description, assignee, createdBy} = req.body;
        task.CreateTask(projectId, title, description, assignee, createdBy);
        res.json('success');
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

router.get('/project/:projectId', async(req,res) => {
    try {
        const {projectId} = req.params;
        taskCollection().orderByChild("projectId").equalTo(projectId).on('value', (snapshot) => {
            let result = []
            for (var key in snapshot.val()) {
                result.push({id: key, ...snapshot.val()[key]})
            }
            console.log(result)
            res.json(result)
        })
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

router.get('/:taskId', async(req,res) => {
    try {
        const {taskId} = req.params;
        console.log(taskId)
        taskCollection(taskId).once('value', (snapshot) => {
            res.json({id:taskId,...snapshot.val()})
        })
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

router.patch('/:taskId', async(req,res) => {
    try {
        const {taskId} = req.params;
        const request = req.body;
        taskCollection(taskId).update(request)
        res.json('success')
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

module.exports = router