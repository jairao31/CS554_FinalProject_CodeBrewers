const express = require('express');
const { getDatabase } = require('firebase-admin/database');
const { v4 } = require('uuid');
const { taskCollection } = require('../data/Refs');
const router = express.Router();

router.post('/', async(req,res) => {
    try {
        const {projectId, title, description, assignees, createdBy, status} = req.body;
        if(!projectId || !title || !description  || !createdBy) {
            res.status(401).json({error:'Insufficient Funds'})
            return
        }
        if(typeof projectId !== "string" || typeof title !== "string" ) {
            res.status(401).json({error:'Invalid data type'})
            return
        }

        const taskData = {
            publicId: v4(),
            projectId,
            title,
            description,
            assignees: assignees || [],
            createdBy,
            status: status,
            comments:[],
            createdOn: new Date().toISOString()
        }

        taskCollection(taskData.publicId).set(taskData, error => {
            if(error) {
                res.status(500).json({error: "Task could not be added"})
            }else{
                res.json(taskData);
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

router.get('/project/:projectId', async(req,res) => {
    try {
        const {projectId} = req.params;
        taskCollection().orderByChild("projectId").equalTo(projectId).once('value', (snapshot) => {
            let result = []
            if(!snapshot.val()) {
                res.json([]);
                return;
            }
            for (var key in snapshot.val()) {
                result.push(snapshot.val()[key])
            }
            res.json(result)
        })
    } catch (error) {
        console.log(error)
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
                return
            }else{
                taskCollection(taskId).once('value', snapshot => {
                    if(snapshot.val()) {
                        res.json(snapshot.val())
                    }else{
                        res.status(500).json({error:'Could not get updated task'})
                        return
                    }
                })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

router.patch('/comment/:taskId', async(req,res) => {
    try {
        const {taskId} = req.params;
        const comment = req.body;
        const commentRequest = {
            publicId: v4(),
            createdOn: new Date().toISOString(),
            ...comment
        }
        taskCollection(taskId).once('value', snapshot => {
            if(!snapshot.val()) {
                res.status(500).json({error:'Task could not be found'})
                return
            }
            let finalComments = []
            if(snapshot.val().comments) {
                finalComments = [...snapshot.val().comments,commentRequest]
            }else{
                finalComments.push(commentRequest)
            }
            taskCollection(taskId).update({
                comments: finalComments
            }, error => {
                if(error) {
                    res.status(500).json({error: "could not update task"})
                    return
                }
                res.json({
                    ...snapshot.val(),
                    comments: finalComments
                })
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

router.delete('/comment/:taskId/:commentId', async(req,res) => {
    const {taskId, commentId} = req.params
    taskCollection(taskId).once('value', snapshot => {
        if(!snapshot.val()) {
            res.status(500).json({error:'Task could not be found'})
            return
        }
        taskCollection(taskId).update({
            comments: snapshot.val().comments.filter(i => i.publicId !== commentId)
        }, error => {
            if(error) {
                res.status(500).json({error: "could not update task"})
                return
            }
            res.json({
                ...snapshot.val(),
                comments: snapshot.val().comments.filter(i => i.publicId !== commentId)
            })
        })
    })
})

router.delete('/:taskId', async(req,res) => {
    try {
        const {taskId} = req.params
        taskCollection(taskId).remove(error => {
            if(error){
                res.status(500).json({error:'Could not delete task'})
                return
            }else{
                res.json('task deleted successfully')
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

module.exports = router