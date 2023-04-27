const firebase = require("firebase");

const db = firebase.firestore();

class Bus {
    constructor(id, vnum, dname, cname, phone, route, dt, at, availability, price, sstatus) {
        this.id = id;
        this.vnum = vnum;
        this.dname = dname;
        this.cname = cname;
        this.phone = phone;
        this.route = route;
        this.dt = dt;
        this.at = at;
        this.availability = availability;
        this.price = price;
        this.sstatus = sstatus || [];

    }

    static fromFirestoreData(doc) {
        const data = doc.data();
        const id = doc.id;
        const { vnum, dname, cname, phone, route, dt, at, availability, price, sstatus } = data;
        return new Bus(id, vnum, dname, cname, phone, route, dt, at, availability, price, sstatus);
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
            availability: this.availability,
            price: this.price,
            sstatus: this.sstatus
        };
    }
}

const busModel = db.collection("Bus");

module.exports = { Bus, busModel };
