const express = require('express');
const { userCollection } = require('../data/Refs');
const router = express.Router();
const { v4 } = require('uuid');
const { storage } = require("../data/firebase");
const {
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const nodemailer = require('nodemailer')


// "isPassword" function used to check pass
function isPassword(str) {
  if (!str) throw `Password must be provided`;
  if (typeof str != "string") throw `Password must be a string`;
  if (str.trim().length == 0) throw `Password cannot just be empty spaces`;
  if (str.toLowerCase().trim() != str.toLowerCase().trim().replace(/\s+/g, ""))
    throw `Password cannot have spaces`;
  let strippedStr = str.toLowerCase().trim().replace(/\s+/g, "");
  if (strippedStr.length < 6) throw `Password must be at least six characters`;
}

// "SIGNUP" Router calling "CreateUser"
router.post("/signup", async (req, res) => {
  try {
    const { publicId, password, firstName, lastName, email, profilePhotoUrl, type } = req.body;

    if(!publicId || !email || !password || !firstName || !lastName || !type) {
        res.status(400).json({error: "Insufficient inputs"});
        return
    }

    if( typeof email !== "string" || 
        typeof publicId !== "string" || 
        typeof password !== "string" || 
        typeof firstName !== "string" ||
        typeof lastName !== "string" ||
        typeof type !== "string" ||
        password.trim().length < 6
        ) {
      res.status(400).json({error: "Invalid input"});
      return
  }

    isPassword(password);
    userCollection()
      .orderByChild("email")
      .equalTo(email)
      .once("value", (snapshot) => {
        try {
          // console.log('entered')
          let result = [];
          userCollection().off("value");
          for (var key in snapshot.val()) {
            result.push({ id: key, ...snapshot.val()[key] });
          }
          if (result.length >= 1) {
            res
              .status(404)
              .json(
                "An account with this email already exists. Please try logging in."
              );
          } else {
            const userData = {
              publicId,
              type,
              profilePhotoUrl: profilePhotoUrl ||  null,
              firstName: firstName.trim().toLowerCase(),
              lastName: lastName.trim().toLowerCase(),
              displayName:
                `${firstName.trim()[0].toUpperCase() + firstName.trim().slice(1)} ${lastName.trim()[0].toUpperCase() + lastName.trim().slice(1)}`,
              email: email.trim(),
              skills: [],
              requests: [],
              projects: [],
              completedProjects: [],
              createdOn: new Date().toISOString(),
              lastActive: null,
              isActive: false,
            };
            userCollection(userData.publicId).set(userData, (error) => {
              if (error) {
                res
                  .status(500)
                  .json({ error: "User could not be registered!" });
              } else {
                res.json(userData);
              }
            });
          }
        } catch (error) {
          console.log(error);
          res
            .status(500)
            .json({ error: error.message ? error.messsage : error });
          console.log(error);
        }
      });
    // res.json('success');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message ? error.messsage : error });
  }
});

// "LOGIN" Router calling "checkPass" and "userCollection"
router.get("/login/:publicId", async (req, res) => {
  try {
    const { publicId } = req.params;

    if(!publicId) {
      res.status(400).json({error: "Please provide a user ID"});
      return
    }

    userCollection(publicId).once("value", (snapshot) => {
      try {
        if (!snapshot.val()) {
          res.status(404).json("No username found");
          return
        } else {
          if(snapshot.val()) {
            userCollection(publicId).update({isActive: true}, error => {
              if(error) {
                res.status(404).json("No user found");
                return
              }else{
            res.json({...snapshot.val(),isActive: true});
            }
          });
          }
      }
      } catch (error) {
        res.status(500).json({ error: error.message ? error.messsage : error });
        console.log(error);
        return
      }
  
  })
    // })
  } catch (error) {
    res.status(500).json({ error: error.message ? error.messsage : error });
  }
});

// Edit User by userId
router.patch("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if(!userId) {
      res.status(400).json({error: "Please provide a user ID"});
      return
    }
    let request = req.body;
    if(!request) {
      res.status(400).json({error: "Please provide data"});
      return
    }
    request = {
      ...request,
      firstName: request.firstName.trim().toLowerCase(),
      lastName: request.lastName.trim().toLowerCase(),
      displayName: `${request.firstName.trim()[0].toUpperCase() + request.firstName.trim().slice(1)} ${request.lastName.trim()[0].toUpperCase() + request.lastName.trim().slice(1)}`
    }
    // var idToUpdate=task.getUserList(userName);
    userCollection(userId).update(request, (error) => {
      if (error) {
        res.status(500).json({ error: "Could not update user" });
        return;
      }
      userCollection(userId).once("value", (snapshot) => {
        if (!snapshot.val()) {
          res.status(500).json({ error: "Could not get updated user" });
          return;
        }
        res.json(snapshot.val());
      });
    });
    // console.log(result)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message ? error.messsage : error });
  }
});

router.patch("/profileImage/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if(!userId) {
      res.status(400).json({error: "Please provide a userID"});
      return
  }
    const profileImg = req.files.profilePic;
    if(!profileImg) {
      res.status(400).json({error: "Please provide a profile Pic"});
      return
  }
    const imageRef = ref(storage, `userProfile/${userId}/${v4()}`);
    uploadBytes(imageRef, profileImg.data).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const request = { profilePhotoUrl: url };
        userCollection(userId).update(request, (error) => {
          if (error) {
            res.status(500).json({ error: "could not upload profile photo" });
            return;
          }
          res.json(url);
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message ? error.messsage : error });
  }
});


// "searchByUserName" router calling "userCollection"
router.get('/searchByUserName',async(req,res)=>{
    try{
        const {userName} = req.body;
        if(!userName) {
          res.status(400).json({error: "Please provide a userName"});
          return
      }
      if(typeof userName !== "string") {
        res.status(400).json({error: "Invalid username"});
        return
    }
        userCollection().orderByChild("userName").equalTo(userName).once('value', (snapshot) => {
            let result = []
            for (var key in snapshot.val()) {
                result.push({id: key, ...snapshot.val()[key]})
            }
            if (result.length===0){
                res.json("Sorry! No user found with "+userName+" username. Try Again!")
                return;
            }
            res.json(result)
        })
    }catch(error){
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

// "searchByFirstName" router calling "userCollection"
router.get('/searchByFirstName',async(req,res)=>{
    try{
        const {firstName} = req.body;
        if(!firstName) {
          res.status(400).json({error: "Please provide a firstName"});
          return
      }
      if(typeof firstName !== "string") {
        res.status(400).json({error: "Invalid request"});
        return
    }
        userCollection().orderByChild("firstName").equalTo(firstName).once('value', (snapshot) => {
            let result = []
            for (var key in snapshot.val()) {
                result.push({id: key, ...snapshot.val()[key]})
            }
            if (result.length===0){
                res.json("Sorry! No user found with "+firstName+" first name. Try Again!")
                return;
            }
            res.json(result)
        })
    }catch(error){
        res.status(500).json({error: error.message ?error.messsage: error})
    }
})

// :projectId in the router
// router.patch('/invite/:userId/:projectId', async(req,res) => {
//     try {
//         const {userId, projectId} = req.params;
//         const request = req.body;
//         for (var i=0; i< request['requests'].length;i++){
//             userCollection(request['requests'][i]).child('requests').push().set(projectId)       
//         }

//         res.json("Invite Sent to Id/Id's: "+ request['requests'] +" by "+userId)
//     } catch (error) {
//         res.status(500).json({error: error.message ?error.messsage: error})
//     }
// })


router.get("/autoComplete/:query", async(req,res) => {
    const {query} = req.params
    if(!query) {
      res.status(400).json({error: "Please provide a query"});
      return
  }
    userCollection().orderByChild('firstName').startAt(query.toUpperCase()).endAt(query.toLowerCase() + '\uf8ff').once('value',snapshot => {
        let result = []
        for(let key in snapshot.val()){
            if(snapshot.val()[key].firstName.indexOf(query.toLowerCase()) === 0) {
                const {displayName, publicId, profilePhotoUrl} = snapshot.val()[key]
                result.push({
                    displayName, publicId, profilePhotoUrl
                })
            }
          }
        res.json(result)
    })
})

router.get("/logout/:userId", async (req, res) => {
    const {userId} = req.params;
    if(!userId) {
      res.status(400).json({error: "Please provide a userId"});
      return
  }
    userCollection(userId).once("value", (snapshot) => {
      try {
        if (!snapshot.val()) {
          res.json("No username found");
          return
        } else {
          if(snapshot.val()) {
            userCollection(userId).update({isActive: false}, error => {
              if(error) {
                res.status(500).json('could not logout');
                
              }else{
                res.json('logged out successfully!')
              }
            })
          }
      }
      } catch (error) {
        res.status(500).json({ error: error.message ? error.messsage : error });
        console.log(error);
        return
      }
  
  })
  
});

router.post("/invite/email", async(req,res) => {
  try {
    const {reciever,sender} = req.body
    if(!reciever || !sender) {
      res.status(400).json({error: "Insufficent inputs"});
      return
  }
  
    const output = `<div>
      <p><strong>${sender.displayName}</strong> invites you to join <strong>TULSEE</strong>.</p>
      <a href='http://34.238.51.139:3000/'>Click here</a>
    </div>`

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.AUTH_USERNAME,
        pass: process.env.AUTH_PASSWORD,
        clientId: process.env.AUTH_CLIENT_ID,
        clientSecret: process.env.AUTH_SECRET,
        refreshToken: process.env.AUTH_REFRESH_TOKEN
      }
    });

    let info = await transporter.sendMail({
      from: `smane2@stevens.edu`, // sender address
      to: reciever, // list of receivers
      subject: "Invite to TULSEE", // Subject line
      text: `Hello, you've been invited to join TULSEE by ${sender.displayName}`, // plain text body
      html: output, // html body
    });

    res.json({messageId: info.messageId})
    // userCollection(reciever).once('value', snapshot => {
    //   if(!snapshot.val()) {
    //     res.status(500).json({error: "Could not get reciever info"});
    //     return;
    //   }

    // })

  } catch (error) {
    console.log(error)
    res.status(500).json({error:"Could not send email to the user"})
  }
})

module.exports = router