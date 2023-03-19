const express = require('express');
var router = express.Router();
const { Bus, busModel } = require('../models/bus.model');

router.post("/addbus", async (req, res) => {

    const { vnum, dname, cname, phone, route, dt, at, availability } = req.body;

    try {
        const newBus = new Bus(null, vnum, dname, cname, phone, route, dt, at, availability);
        const newBusDocRef = await busModel.add(newBus.toFirebaseData());
        const newBusDoc = await newBusDocRef.get();

        res.send({ status: 200, message: 'Bus added successfully', busDetails: newBusDoc.data() });
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: 400, message: 'Unable to Add Bus' });
    }
});

router.get("/list", async (req, res) => {
    try {
      const snapshot = await busModel.get();
      const list = snapshot.docs.map((doc) => Bus.fromFirestoreData(doc));
      const recordCount = list.length;
      res.send({ status: 200, recordCount: recordCount, results: list });
    } catch (error) {
      res.status(400).send({ status: 400, message: 'Unable to list Buses' });
    }
  });

module.exports = router;