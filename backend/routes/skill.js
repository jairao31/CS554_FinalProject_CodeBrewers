const express = require('express');
const { getDatabase } = require('firebase-admin/database');
const { taskCollection } = require('../data/Refs');
const router = express.Router();

const CreateSkill = async(skillName, skillDisplayName) => {
    if (!skillName || !skillDisplayName) throw "Insufficient fields"
    if (typeof skillName !== "string" || typeof skillDisplayName !== "string") throw "Invalid data"

    const skillData = {
        skillName, 
        skillDisplayName
    }

    const db = getDatabase();
    const ref = db.ref('server/tulsee')
    const skillRef = ref.child('skills')
    skillRef.push().set(skillData)
}

router.post('/', async(req, res) => {
    try {
        const {skillName, skillDisplayName} = req.body
        CreateSkill(skillName, skillDisplayName)
        res.json('success')
    } catch (e) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

router.get('/:skillId', async(req, res) => {
    try {
        const {skillId} = req.params;
        
    } catch (e) {
        
    }
})