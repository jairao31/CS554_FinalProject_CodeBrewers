const express = require('express');
const router = express.Router();
let task = require('../data/Tasks');

router.post('/', async(req,res) => {
    try {
        const {projectId, title, description, assignee, createdBy} = req.body;
        await task.CreateTask(projectId, title, description, assignee, createdBy);
        res.json('success');
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

module.exports = router