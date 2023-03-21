const firebase = require("firebase");

const db = firebase.firestore();

class CancelBookings {
    constructor(id, date, nicnum, fname, lname, phone, from, to, seatnum, busnum, time) {
        this.id = id;
        this.date = date;
        this.nicnum = nicnum;
        this.fname = fname;
        this.lname = lname;
        this.phone = phone;
        this.from = from;
        this.to = to;
        this.seatnum = seatnum;
        this.busnum = busnum;
        this.time = time;

    }

    static fromFirestoreData(doc) {
        const data = doc.data();
        const id = doc.id;
        const { date, nicnum, fname, lname, phone, from, to, seatnum, busnum, time } = data;
        return new CancelBookings(id, date, nicnum, fname, lname, phone, from, to, seatnum, busnum, time);
    }

    toFirebaseData() {
        return {
            date: this.date,
            nicnum: this.nicnum,
            fname: this.fname,
            lname: this.lname,
            phone: this.phone,
            from: this.from,
            to: this.to,
            seatnum: this.seatnum,
            busnum: this.busnum,
            time: this.time
        };
    }
}

const cancelbookingsModel = db.collection("Cancel Bookings");

module.exports = { CancelBookings, cancelbookingsModel };
