const express = require('express');
const app = express();
var cors = require("cors");
var options = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
app.use(cors(options));
// const {verifyUser} = require("./middlewares/JWT");

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
const http = require('http').createServer(app);
const { Server } = require("socket.io");
app.use(cors());


const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


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


io.on('connection', (socket) => {
  console.log('new client connected', socket.id);

  socket.on('user_join', (name, userId, room) => {
    console.log(name, room)
    socket.join(room)
    io.to(room).emit('user_join', {name, userId});
  });

  // socket.on()

  socket.on('message', ({room, name, sender, text}) => {
    // console.log(name, message, socket.id);
    io.to(room).emit('message', {name, sender, text});
  });

  socket.on('disconnect', () => {
    console.log('Disconnect Fired');
  });
  
});

app.use((req,res,next) => {
  console.log('Current Timestamp: ', new Date().toUTCString());
  console.log('Request Method: ', req.method);
  console.log('Request Route: ', req.originalUrl);
  next();
  // console.log(`User is${req.session.email ? "" : " not"} authenticated`)
})


http.listen(3001, () => {
  console.log("Server has been initialized!");
  console.log('Your routes will be running on http://localhost:3001');
});


