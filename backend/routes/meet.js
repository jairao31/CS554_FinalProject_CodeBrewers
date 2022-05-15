const express = require('express');
const router = express.Router();

//include required modules
const jwt = require("jsonwebtoken");
const config = require("../config/meetConfig");
const rp = require("request-promise");
const nodemailer = require('nodemailer')


var email;

//Use the ApiKey and APISecret from config.js
const payload = {
  iss: config.APIKey,
  exp: new Date().getTime() + 5000,
};

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

const token = jwt.sign(payload, config.APISecret);
router.post("/", (req, res) => {
  console.log('Reached Hereeeee');
  email = req.body.email;
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: "Meeting",
      type: 1,
      settings: {
        host_video: "true",
        participant_video: "true",
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };



  rp(options)
    .then(async function (response) {
      console.log("response is: ", response.join_url);
      const output = `<div>
      <p>You can join the meet at <strong>${response.join_url}</strong></p>
    </div>`
    
      await transporter.sendMail({
        from: `tulsee4ever@gmail.com`, // sender address
        to: 'tulsee4ever@gmail.com', // list of receivers
        subject: "New meeting created", // Subject line
        text: `meeting link`, // plain text body
        html: output, // html body
      });
      // response.status(200).json(response);
      let dataRes = {
        join_url: response.join_url,
      };
      res.status(200).json(dataRes);

      // res.send("create meeting result: " + JSON.stringify(response));
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
});


module.exports = router



