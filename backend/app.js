const express = require('express');
const app = express();
const {verifyUser} = require("./middlewares/JWT");

var firebase = require('firebase-admin')

var serviceAccount = require('./service_account.json');
//   const firebaseConfig = {
//   apiKey: "AIzaSyA80n1RK8xk-2PY44aZz-mY8Q8Pq3XLZm0",
//   authDomain: "tulsee-43d3d.firebaseapp.com",
//   projectId: "tulsee-43d3d",
//   storageBucket: "tulsee-43d3d.appspot.com",
//   messagingSenderId: "357663161206",
//   appId: "1:357663161206:web:a8bafd513291667fbf1857",
//   measurementId: "G-2PQ5YJ42WS"
// };

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: "https://tulsee-43d3d-default-rtdb.firebaseio.com/"
});

const session = require('express-session');
const configRoutes = require('./routes');
app.use(express.json());

app.use(
    session({
        name: 'AuthCookie',
        secret: 'some secret string!',
        resave: false,
        saveUninitialized: true
    })
  );
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next) => {
  console.log('Current Timestamp: ', new Date().toUTCString());
  console.log('Request Method: ', req.method);
  console.log('Request Route: ', req.originalUrl);
  next();
  // console.log(`User is${req.session.email ? "" : " not"} authenticated`)
})

app.use((req,res,next) => {
  try{
    if(req.originalUrl !== "/user/login" &&
    req.originalUrl !== "/user/signup"
    ) {
      let user = verifyUser(req.headers.accesstoken)
      req.headers.user = user;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({error: "Unauthorized access!"})
  }
})

configRoutes(app);

app.listen(3000, () => {
  console.log("Server has been initialized!");
  console.log('Your routes will be running on http://localhost:3000');
});
