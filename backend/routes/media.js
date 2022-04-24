const express = require("express");
const { getDatabase } = require("firebase-admin/database");
const { mediaCollection } = require("../data/Refs");
const { v4 } = require("uuid");
const router = express.Router();

//Routes for Media upload
router.post("/", async (req, res) => {
  try {
    const { type, url, uploadedBy, timeCreated, projectId } = req.body;
    if (!type || !url || !uploadedBy || !projectId || !timeCreated) {
      res.status(401).json({ error: "Insufficient data" });
      return;
    }
    if (
      typeof type !== "string" ||
      typeof url !== "string" ||
      typeof uploadedBy !== "string" ||
      typeof projectId !== "string" ||
      typeof timeCreated !== "string"
    ) {
      res.status(401).json({ error: "Invalid data type" });
      return;
    }

    if (
      type.trim().length === 0 ||
      url.trim().length === 0 ||
      uploadedBy.trim().length === 0 ||
      projectId.trim().length === 0 ||
      timeCreated.trim().length === 0
    ) {
      res.status(401).json({ error: "empty space as input detected" });
      return;
    }

    const mediaData = {
      type,
      url,
      timeCreated,
      uploadedBy,
      projectId,
      publicId: v4(),
    };

    const db = getDatabase();
    const ref = db.ref("server/tulsee");
    const mediaRef = ref.child(`media/${projectId}`);
    mediaRef.push().set(mediaData, (error) => {
      if (error) {
        res.status(500).json({ error: "Media could not be added" });
      } else {
        res.json("Media was added successfully");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message ? error.messsage : error });
  }
});

//Route to delete media in a project
router.delete("/project/:projectId/:mediaId", async (req, res) => {
  try {
    const { projectId, mediaId } = req.params;
    const db = getDatabase();
    const ref = db.ref("server/tulsee");
    const mediaRef = ref.child(`media/${projectId}`);
    mediaRef.once("value", (snapshot) => {
      snapshot.forEach((child) => {
        if (child.val().publicId === mediaId) {
          child.ref.remove();
        }
      });
      res.json("done");
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message ? error.messsage : error });
  }
});

//Route to get all media by projectID
router.get("/project/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    mediaCollection(projectId).once("value", (snapshot) => {
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
