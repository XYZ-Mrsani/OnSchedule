const firebase = require("firebase");

const db = firebase.firestore();

class CancelBookings {
    constructor(id, datetime, nicnum, fname, lname, phone, from, to, seatnum, busnum, amount, time) {
        this.id = id;
        this.datetime = datetime;
        this.nicnum = nicnum;
        this.fname = fname;
        this.lname = lname;
        this.phone = phone;
        this.from = from;
        this.to = to;
        this.seatnum = seatnum;
        this.busnum = busnum;
        this.amount = amount;
        this.time = time;

    }

    static fromFirestoreData(doc) {
        const data = doc.data();
        const id = doc.id;
        const { datetime, nicnum, fname, lname, phone, from, to, seatnum, busnum, amount, time } = data;
        return new CancelBookings(id, datetime, nicnum, fname, lname, phone, from, to, seatnum, busnum, amount, time);
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

const cancelbookingsModel = db.collection("Cancel Bookings");

module.exports = { CancelBookings, cancelbookingsModel };
