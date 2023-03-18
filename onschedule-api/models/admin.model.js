const firebase = require("firebase");

const db = firebase.firestore();

class Admin {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;

    }

    static fromFirestoreData(doc) {
        const data = doc.data();
        const id = doc.id;
        const { username, password } = data;
        return new Admin(id, username, password);
    }

    toFirebaseData() {
        return {
            username: this.username,
            password: this.password
        };
    }
}

const adminModel = db.collection("Admin");

module.exports = { Admin, adminModel };
