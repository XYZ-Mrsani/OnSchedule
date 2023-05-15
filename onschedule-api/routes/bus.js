const express = require('express');
var router = express.Router();
const { Bus, busModel } = require('../models/bus.model');

router.post("/addbus", async (req, res) => {

  const { vnum, dname, cname, phone, route, dt, at, availability, price } = req.body;
  const sstatus = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  try {
    const newBus = new Bus(null, vnum, dname, cname, phone, route, dt, at, availability, price, sstatus);
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

router.get("/viewbus", async (req, res) => {

  const id = req.query.id;
  try {
    const snapshot = await busModel.doc(id).get();
    const list = snapshot.data();
    const recordCount = list.length;
    res.send({ status: 200, recordCount: recordCount, results: list });
  } catch (error) {
    res.status(400).send({ status: 400, message: 'Unable to list Bus' });
  }
});

router.get("/vbus", async (req, res) => {

  const busnum = req.query.busnum;
  try {
    const snapshot = await busModel.where("vnum", "==", busnum).get();
    const list = snapshot.docs.map((doc) => doc.data());
    const recordCount = list.length;
    res.send({ status: 200, recordCount: recordCount, results: list });
  } catch (error) {
    res.status(400).send({ status: 400, message: 'Unable to list Bus' });
  }
});

router.put("/update", async (req, res) => {

  try {
    const id = req.query.id;
    const sstatusText = req.body.sstatus;
    const sstatus = sstatusText.split(',').map(s => parseInt(s));

    const { vnum, dname, cname, phone, route, dt, at, availability, price } = req.body;

    const updateBus = new Bus(id, vnum, dname, cname, phone, route, dt, at, availability, price, sstatus);
    await busModel.doc(id).update(updateBus.toFirebaseData());

    const updateBusDoc = await busModel.doc(id).get();

    res.send({ status: 200, message: "Bus Updated Successfully", results: updateBusDoc.data() })
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: 400, message: 'Unable to Update Bus' });
  }
});

router.delete("/delete", async (req, res) => {

  try {
    const id = req.query.id;
    await busModel.doc(id).delete();
    res.send({ status: 200, message: "Bus Deleted Successfully" });
  } catch (error) {
    res.status(400).send({ status: 400, message: 'Unable to Delete Bus' });
  }
});

module.exports = router;