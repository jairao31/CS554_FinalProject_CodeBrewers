const express = require('express');
const app = express();

var firebase = require('firebase-admin')

var serviceAccount = require('./service_account.json');
// const firebaseConfig = {
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

configRoutes(app);



app.listen(3000, () => {
  console.log("Server has been initialized!");
  console.log('Your routes will be running on http://localhost:3000');
});
