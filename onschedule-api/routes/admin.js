var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { Admin, adminModel } = require('../models/admin.model');


router.post('/add', async (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      res.send({ message: "hash error" });
    } else {
      try {
        const { username, password } = req.body;

        const admin = new Admin(null, username, hash);
        const adminDocRef = await adminModel.add(admin.toFirebaseData());
        const adminDoc = await adminDocRef.get();

        res.send({ status: 200, message: 'Admin added successfully', AdminDetails: adminDoc.data() });
      } catch (error) {
        console.log(error);
        res.status(400).send({ status: 400, message: 'Unable to Add Admin' });
      }
    }
  })
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    await adminModel.where("username", "==", username).get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        res.send({ message: "Username Not Found" });
      }
      querySnapshot.forEach((doc) => {
        const admin = Admin.fromFirestoreData(doc);

        bcrypt.compare(password, admin.password, (err, ret)=>{
          if(ret){
            const payload = { userName: admin.username };
            const token = jwt.sign(payload, 'webBatch');
            res.send({ success: true, token:token, messages: "Login Successful" });
          }else{
            res.send({ success: false, message: 'Password does not match' });
          }
        });
      });
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({ status: 400, message: 'Unable to list admin' });
  }
});

module.exports = router;
