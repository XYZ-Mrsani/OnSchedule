const firebase = require("firebase");

const db = firebase.firestore();

class Transaction {
    constructor(id, datetime, amount, nicnum, pname, busnum, dt, at, destination, ) {
        this.id = id;
        this.datetime = datetime;
        this.amount = amount;
        this.nicnum = nicnum;
        this.pname = pname;
        this.busnum = busnum;
        this.dt = dt;
        this.at = at;
        this.destination = destination;

    }

    static fromFirestoreData(doc) {
        const data = doc.data();
        const id = doc.id;
        const { datetime, amount, nicnum, pname, busnum, dt, at, destination } = data;
        return new Transaction(id, datetime, amount, nicnum, pname, busnum, dt, at, destination);
    }

    toFirebaseData() {
        return {
            datetime: this.datetime,
            amount: this.amount,
            nicnum: this.nicnum,
            pname: this.pname,
            busnum: this.busnum,
            dt: this.dt,
            at: this.at,
            destination: this.destination

        };
    }
}

const transactionModel = db.collection("Transaction");

module.exports = { Transaction, transactionModel };
