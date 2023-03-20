const firebase = require("firebase");

const db = firebase.firestore();

class Passenger {
    constructor(id, pname, datetime, feedback, busnum, busroute) {
        this.id = id;
        this.pname = pname;
        this.datetime = datetime;
        this.feedback = feedback;
        this.busnum = busnum;
        this.busroute = busroute;

    }

    static fromFirestoreData(doc) {
        const data = doc.data();
        const id = doc.id;
        const { pname, datetime, feedback, busnum, busroute } = data;
        return new Passenger(id, pname, datetime, feedback, busnum, busroute);
    }

    toFirebaseData() {
        return {
            pname: this.pname,
            datetime: this.datetime,
            feedback: this.feedback,
            busnum: this.busnum,
            busroute: this.busroute
        };
    }
}

const passengerModel = db.collection("Passenger");

module.exports = { Passenger, passengerModel };
