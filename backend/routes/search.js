const express=require('express');
const { getDatabase } = require('firebase-admin/database');
const { v4 } = require('uuid');
const { projectCollection, taskCollection, userCollection } = require('../data/Refs');
const router=express.Router();

router.get('/:query/:type',async(req,res)=>{
    try {
        const {query, type} = req.params
        console.log(query, type)
        // if (/\s/g.test(query) )   newQuery= query.split(" ")[0]
        // else newQuery=query
        // If we have to just keep search by FIRST WORD recommendation then apply previous two lines of code
        if (type === 'project'){
            projectCollection().orderByChild('name').startAt(query).endAt(query + '\uf8ff').once('value',snapshot => {
                let result = []
                for(key in snapshot.val()){
                    if(snapshot.val()[key].name.indexOf(query) === 0) {
                        // const {createdBy, name, participants} = snapshot.val()[key]
                        // console.log(name,participants,"====================================")
                        // result.push({
                        //     createdBy, name, participants
                        // })
                        result.push(snapshot.val())
                    }
                }
                if (result.length===0){
                    res.json("Sorry! No Project found with "+query+" project name. Try Again!")
                    return;
                }
                res.json(result)
            })
        }else if(type=== "task"){
            taskCollection().orderByChild('title').startAt(query).endAt(query + '\uf8ff').once('value',snapshot => {
                let result = []
                for(key in snapshot.val()){
                    if(snapshot.val()[key].title.indexOf(query) === 0) {
                        // const {description, projectId, title} = snapshot.val()[key]
                        // console.log( projectId, title,"====================================")
                        // result.push({
                        //     description, projectId, title
                        // })
                        result.push(snapshot.val())
                    }
                }
                if (result.length===0){
                    res.json("Sorry! No task found with "+query+" task title. Try Again!")
                    return;
                }
                res.json(result)
            })
        }else if(type=== "user"){
            userCollection().orderByChild('firstName').startAt(query).endAt(query + '\uf8ff').once('value',snapshot => {
                let result = []
                for(key in snapshot.val()){
                    if(snapshot.val()[key].firstName.indexOf(query) === 0) {
                        // const {description, projectId, title} = snapshot.val()[key]
                        // console.log( projectId, title,"====================================")
                        // result.push({
                        //     description, projectId, title
                        // })
                        result.push({id: key, ...snapshot.val()[key]})
                    }
                }
                if (result.length===0){
                    res.json("Sorry! No user found with "+query+" user name. Try Again!")
                    return;
                }
                res.json(result)
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message ?error.messsage: error})
    }
});


module.exports = router