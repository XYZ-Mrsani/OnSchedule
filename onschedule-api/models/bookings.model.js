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

class Bookings {
    constructor(id, datetime, nicnum, fname, lname, phone, from, to, seatnum, busnum, amount, time) {
        this.id = id;
        this.datetime = datetime;
        this.nicnum = nicnum;
        this.fname = fname;
        this.lname = lname;
        this.phone = phone;
        this.from = from;
        this.to = to;
        this.seatnum = Array.isArray(seatnum) ? seatnum.join(',') : seatnum;;
        this.busnum = busnum;
        this.amount = amount;
        this.time = time;

    }

    static fromFirestoreData(doc) {
        const data = doc.data();
        const id = doc.id;
        const { datetime, nicnum, fname, lname, phone, from, to, seatnum, busnum, amount, time } = data;
        return new Bookings(id, datetime, nicnum, fname, lname, phone, from, to, seatnum, busnum, amount, time);
    }

    toFirebaseData() {
        return {
            datetime: this.datetime,
            nicnum: this.nicnum,
            fname: this.fname,
            lname: this.lname,
            phone: this.phone,
            from: this.from,
            to: this.to,
            seatnum: this.seatnum,
            busnum: this.busnum,
            amount: this.amount,
            time: this.time
        };
    }
}

const bookingsModel = db.collection("Bookings");

module.exports = { Bookings, bookingsModel };
