const express = require('express');
const { getDatabase } = require('firebase-admin/database');
const { skillCollection } = require('../data/Refs');
const router = express.Router();

//Route for skill creation
router.post('/', async(req, res) => {
    try {
        const CreateSkill = (skillName) => {
          if (!skillName) throw "Insufficient fields";
          if (typeof skillName !== "string") throw "Invalid data";
          if (skillName.trim().length === 0)
            throw "Skill name as empty space detected";

          function titleCase(str) {
            str = str.toLowerCase().split(" ");
            for (var i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(" ");
          }

          const skillData = {
            skillName: skillName,
            skillDisplayName: titleCase(skillName),
          };

          const db = getDatabase();
          const ref = db.ref("server/tulsee");
          const skillRef = ref.child("skills");
          skillRef.push().set(skillData);
        }

        const {skillName} = req.body
        CreateSkill(skillName)
        res.json('success')
    } catch (error) {
        res.status(500).json({ error: error.message ? error.messsage : error });
    }
})

//Route to get all skills
router.get('/', (req,res) => {
    try {
        skillCollection().on('value', (snapshot) => {
            let result = []
            for (var key in snapshot.val()) {
                result.push({id: key, ...snapshot.val()[key]})
            }
            res.json(result)
        })
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

//Route to get skill by skillId
router.get('/:skillId', async(req,res) => {
    try {
        const {skillId} = req.params;
        skillCollection(skillId).once('value', (snapshot) => {
            console.log(snapshot.val())
            if (snapshot.val()){
                res.json({id:skillId,...snapshot.val()})
            }else{
                res.status(500).json({error: "Skill not found"})
            }
        })
    } catch (error) {
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})


module.exports = router
