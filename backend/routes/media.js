const express = require("express");
const { getDatabase } = require("firebase-admin/database");
const { mediaCollection } = require("../data/Refs");
const router = express.Router();

// media type
// 0: document
// 1: Image
// 2: video
// 3: audio

//Routes for Media upload
router.post("/", async (req, res) => {
  try {
    const { type, url, uploadedBy, projectId } = req.body;
    if (!type || !url || !uploadedBy || !projectId) {
      res.status(401).json({ error: "Insufficient data" });
      return;
    }
    if (
      typeof type !== "string" ||
      typeof url !== "string" ||
      typeof uploadedBy !== "string" ||
      typeof projectId !== "string"
    ) {
      res.status(401).json({ error: "Invalid data type" });
      return;
    }

    const mediaData = {
      type,
      url,
      uploadedOn: new Date().toISOString(),
      uploadedBy,
      projectId,
    };

    const db = getDatabase();
    const ref = db.ref("server/tulsee");
    const mediaRef = ref.child("media");
    mediaRef.push().set(mediaData, (error) => {
      if (error) {
        res.status(500).json({ error: "Media could not be added" });
      } else {
        res.json("Media was added successfully");
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message ? error.messsage : error });
  }
});

//Route for get all media by projectID
router.get("/project/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    mediaCollection()
      .orderByChild("projectId")
      .equalTo(projectId)
      .on("value", (snapshot) => {
        let result = [];
        for (var key in snapshot.val()) {
          result.push({ id: key, ...snapshot.val()[key] });
        }
        if (result.length === 0) {
          res.status(500).json({
            error: "Media could not be found for the given projectId",
          });
          return;
        }
        res.json(result);
      });
  } catch (error) {
    res.status(500).json({ error: error.message ? error.messsage : error });
  }
});

module.exports = router;
