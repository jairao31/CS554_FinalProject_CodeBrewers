// Import the functions you need from the SDKs you need

const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA80n1RK8xk-2PY44aZz-mY8Q8Pq3XLZm0",
  authDomain: "tulsee-43d3d.firebaseapp.com",
  databaseURL: "https://tulsee-43d3d-default-rtdb.firebaseio.com",
  projectId: "tulsee-43d3d",
  storageBucket: "tulsee-43d3d.appspot.com",
  messagingSenderId: "357663161206",
  appId: "1:357663161206:web:a8bafd513291667fbf1857",
  measurementId: "G-2PQ5YJ42WS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = { storage, app };
