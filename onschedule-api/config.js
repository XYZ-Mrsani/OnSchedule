const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyAS0rEcNEHopXgu87coBo7nmqtWq8yVv2A",
    authDomain: "onschedule-735e7.firebaseapp.com",
    projectId: "onschedule-735e7",
    storageBucket: "onschedule-735e7.appspot.com",
    messagingSenderId: "256634477922",
    appId: "1:256634477922:web:fd58d3bc97853b00a9203b",
    measurementId: "G-7CD774VPS5",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");

module.exports = User;
