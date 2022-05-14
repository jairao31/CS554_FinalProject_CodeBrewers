const express = require("express");
const { getDatabase } = require("firebase-admin/database");
const { mediaCollection } = require("../data/Refs");
const { v4 } = require("uuid");
const { storage } = require("../data/firebase");
const {
  ref,
  uploadBytes,
  getDownloadURL,
  getMetadata,
  deleteObject,
} = require("firebase/storage");
const router = express.Router();

//Routes for Media upload
router.post("/", async (req, res) => {
  try {
    const { uploadedBy, projectId } = req.body;
    const file = req.files.uploadData;
    if (!uploadedBy || !projectId) {
      res.status(400).json({ error: "Insufficient data" });
      return;
    }
    if (typeof uploadedBy !== "string" || typeof projectId !== "string") {
      res.status(400).json({ error: "Invalid data type" });
      return;
    }

    if (uploadedBy.trim().length === 0 || projectId.trim().length === 0) {
      res.status(400).json({ error: "empty space as input detected" });
      return;
    }

    if(!file) {
      res.status(400).json({ error: "please send a file" });
      return;
    }

    const imageRef = ref(storage, `projects/${projectId}/${file.name}`);
    uploadBytes(imageRef, file.data).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        getMetadata(imageRef).then((metadata) => {
          const mediaData = {
            type: metadata.type,
            name: metadata.name,
            url: url,
            timeCreated: metadata.timeCreated,
            uploadedBy: uploadedBy,
            projectId: projectId,
            publicId: v4(),
          };

          const db = getDatabase();
          const ref = db.ref("server/tulsee");
          const mediaRef = ref.child(
            `media/${projectId}/${mediaData.publicId}`
          );
          mediaRef.set(mediaData, (error) => {
            if (error) {
              res.status(500).json({ error: "Media could not be added" });
            } else {
              res.json(mediaData);
            }
          });
        });
      });
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

    if(!projectId || !mediaId) {
      res.status(400).json({error: "Insufficient inputs"});
      return
    }

    if(typeof projectId !== "string" || typeof mediaId !== "string") {
      res.status(400).json({error: "Invalid inputs"});
      return
    }

    const db = getDatabase();
    const reff = db.ref("server/tulsee");
    const mediaRef = reff.child(`media/${projectId}/${mediaId}`);
    mediaCollection(projectId).once("value", (snapshot) => {
      let mediaName = snapshot.val()[mediaId].name;
      const deleteRef = ref(storage, `projects/${projectId}/${mediaName}`);
      deleteObject(deleteRef).then(() => {
        mediaRef.remove((error) => {
          if (error) {
            res.status(500).json({ error: "could not be deleted" });
          } else {
            res.json("Media deleted successfully");
          }
        });
      });
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
    if(!projectId) {
      res.status(400).json({error: "Please send a project ID"});
      return
    }
    mediaCollection(projectId).once("value", (snapshot) => {
      let result = [];
      for (var key in snapshot.val()) {
        result.push(snapshot.val()[key]);
      }
      res.json(result);
    });
  } catch (error) {
    res.status(500).json({ error: error.message ? error.messsage : error });
  }
});

module.exports = router;
