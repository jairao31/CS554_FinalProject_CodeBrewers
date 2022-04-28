const express=require('express');
const { getDatabase } = require('firebase-admin/database');
const { v4 } = require('uuid');
const { projectCollection, userCollection } = require('../data/Refs');
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

        const {name, requested, type, createdBy} = req.body;
        if(!name || !requested || !type  || !createdBy) {
            res.status(400).json({error:'Insufficient Funds'})
            return
        }
        if(typeof name !== "string" || typeof type !== "string"  || typeof createdBy !== 'object') {
            res.status(400).json({error:'Invalid data type'})
            return
        }

        const projectData = {
            publicId: v4(),
            name: name,
            type: type,
            createdBy: createdBy,
            createdOn: new Date().toISOString(),
            archived: false,
            participants:[createdBy],
            requested: requested || []
        }

        console.log(projectData)
        projectCollection(projectData.publicId).set(projectData, async error => {
            if(error) {
                res.status(500).json({error: "Project could not be added"})
                return
            }else{
                if(type === "Group") {
                    await projectData.requested.forEach(async (invitee, idx) => {
                        // console.log(invitee)
                        await userCollection(invitee.publicId).once('value', async snapshot => {
                            // console.log(snapshot.val())
                            const {publicId, name, createdBy, createdOn} = projectData 
                            let update = {
                                ...snapshot.val(),
                                invites: snapshot.val().invites ? [...snapshot.val().invites,{publicId, name, createdBy, sentOn: createdOn}]  : [{publicId, name, createdBy, sentOn: createdOn}]
                            }
                            await userCollection(invitee.publicId).update(update)
                        })
                    });
                } 
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
            console.log(snapshot.val())
            for (var key in snapshot.val()) {
                if(snapshot.val()[key].participants) {
                    let exist = snapshot.val()[key].participants.find(i => i === userId)
                    if(exist)  result.push({id: key, ...snapshot.val()[key]});
                }
            }
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

//route to archive project
router.patch('/archive/:projectId', async(req,res) => {
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

router.patch('/invite/:userId/:projectId', async(req,res) => {
    try {
        const {userId, projectId} = req.params;
        userCollection(userId).once("value", snapshot => {
            try {

                if(snapshot.val().invites && snapshot.val().invites.find(i => i.publicId === projectId)) {
                    res.status(500).json({error: "An invite has already been sent to this user"})
                    return
                }
                projectCollection(projectId).once('value', projSnapshot => {
                    const update = {
                        ...projSnapshot.val(),
                        requested: [...projSnapshot.val().requested,userId]
                    }
                    projectCollection(projectId).update(update, error => {
                        if(error) {
                            res.status(500).json({error: "Could not update project"})
                            return
                        }else{
                            userCollection(userId).once('value', userSnapshot => {
                                const userUpdate = {
                                    ...userSnapshot.val(),
                                    invites: userSnapshot.val().invites ? [...userSnapshot.val().invites,projectId]  : [projectId]
                                }
                                userCollection(userId).update(userUpdate, error => {
                                    if(error) {
                                        res.status(500).json({error: "Could not update user"})
                                        return
                                    }
                                })
                            })
                        }
                    })
                })      

            } catch (error) {
                res.status(500).json({error: error.message ? error.message : error})
                return
            }
        })

        res.json("Invite Sent to Id: "+ userId)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

module.exports= router