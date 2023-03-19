const firebase = require("firebase");

const db = firebase.firestore();

class Bus {
    constructor(id, vnum, dname, cname, phone, route, dt, at, availability) {
        this.id = id;
        this.vnum = vnum;
        this.dname = dname;
        this.cname = cname;
        this.phone = phone;
        this.route = route;
        this.dt = dt;
        this.at = at;
        this.availability = availability;

    }

    static fromFirestoreData(doc) {
        const data = doc.data();
        const id = doc.id;
        const { vnum, dname, cname, phone, route, dt, at, availability } = data;
        return new Bus(id, vnum, dname, cname, phone, route, dt, at, availability);
    }

    toFirebaseData() {
        return {
            vnum: this.vnum,
            dname: this.dname,
            cname: this.cname,
            phone: this.phone,
            route: this.route,
            dt: this.dt,
            at: this.at,
            availability: this.availability
        };
    }
}

const busModel = db.collection("Bus");

module.exports = { Bus, busModel };
