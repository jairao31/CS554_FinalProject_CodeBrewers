const express = require("express");
const {
  projectCollection,
  userCollection,
} = require("../data/Refs");
const router = express.Router();

router.get("/:query/:type/:publicId", async (req, res) => {
  try {
    // const{}=req.body
    const { query, type, publicId } = req.params;

    if(!query || !type || !publicId) {
      res.status(400).json({error: "Insufficient inputs"});
      return
    }
    // if (/\s/g.test(query))   newQuery= query.split(" ")[0]
    // else newQuery=query
    // If we have to just keep search by FIRST WORD recommendation then apply previous two lines of code
    if (type === "project") {
      projectCollection()
        .orderByChild("searchQuery")
        .startAt(query.toLowerCase())
        .endAt(query.toLowerCase() + "\uf8ff")
        .once("value", (snapshot) => {
          let result = [];
          console.log(snapshot.val())
          for (let key in snapshot.val()) {
            if (snapshot.val()[key].searchQuery.indexOf(query.toLowerCase()) === 0) {
              const { participants } = snapshot.val()[key];
              let exist = participants.find((i) => i.publicId === publicId);
              if (exist) {
                result.push(snapshot.val()[key]);
              }
            }
          }
          // if (result.length === 0) {
          //   res.json([]);
          //   // res.json(
          //   //   "Sorry! No Project found with " +
          //   //     query +
          //   //     " project name. Try Again!"
          //   // );
          //   return;
          // }
          res.json(result);
        });
    } else if (type === "user") {
      const paramPublicId = publicId;
      userCollection()
        .orderByChild("firstName")
        .startAt(query.toLowerCase())
        .endAt(query.toLowerCase() + "\uf8ff")
        .once("value", (snapshot) => {
          let result = [];
          for (let key in snapshot.val()) {
            if (snapshot.val()[key].firstName.indexOf(query.toLowerCase()) === 0) {
              const { publicId } = snapshot.val()[key];
              if (publicId !== paramPublicId) {
                result.push(snapshot.val()[key]);
              }
            }
          }
          // if (result.length === 0) {
          //   res.json([]);
          //   // res.json(
          //   //   "Sorry! No user found with " + query + " user name. Try Again!"
          //   // );
          //   return;
          // }
          res.json(result);
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message ? error.messsage : error });
  }
});

module.exports = router;
