const express = require('express');
var router = express.Router();
const { Passenger, passengerModel } = require('../models/passenger.model');

const now = new Date();

// Get year, month, and day
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');

// Get hours, minutes, and seconds
const hours = String(now.getHours() % 12 || 12).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const meridian = now.getHours() >= 12 ? 'PM' : 'AM';

// Concatenate date and time in the desired format
const datetime = `${year}-${month}-${day} ${hours}:${minutes} ${meridian}`;

router.post("/create", async (req, res) => {

  const { pname, feedback, busnum, busroute } = req.body;

  try {
    const newFeedback = new Passenger(null, pname, datetime, feedback, busnum, busroute);
    const newFeedbackDocRef = await passengerModel.add(newFeedback.toFirebaseData());
    const newFeedbacksDoc = await newFeedbackDocRef.get();

    res.send({ status: 200, message: 'Feedback added successfully', TransactionDetails: newFeedbacksDoc.data() });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: 400, message: 'Unable to Add Feedback' });
  }
});

router.get("/list", async (req, res) => {
  try {
    const snapshot = await passengerModel.get();
    const list = snapshot.docs.map((doc) => Passenger.fromFirestoreData(doc));
    const recordCount = list.length;
    res.send({ status: 200, recordCount: recordCount, results: list });
  } catch (error) {
    res.status(400).send({ status: 400, message: 'Unable to list Feedbacks' });
  }
});

router.get("/viewfeedback", async (req, res) => {

  const id = req.query.id;
  try {
    const snapshot = await passengerModel.doc(id).get();
    const list = snapshot.data();
    const recordCount = list.length;
    res.send({ status: 200, recordCount: recordCount, results: list });
  } catch (error) {
    res.status(400).send({ status: 400, message: 'Unable to list Feedback' });
  }
});

router.get("/vfeedback", async (req, res) => {
  const busnum = req.query.busnum;

  try {
    const snapshot = await passengerModel.where("busnum", "==", busnum).get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const recordCount = list.length;
    res.send({ status: 200, recordCount: recordCount, results: list });
  } catch (error) {
    res.send(400).send({ status: 400, message: 'Unable to list Transaction' })
  }
});

router.put("/update", async (req, res) => {

  try {
    const id = req.query.id;
    const { pname, datetime, feedback, busnum, busroute } = req.body;

    const updateFeedback = new Passenger(id, pname, datetime, feedback, busnum, busroute);
    await passengerModel.doc(id).update(updateFeedback.toFirebaseData());

    const updateFeedbackDoc = await passengerModel.doc(id).get();

    res.send({ status: 200, message: "Feedback Updated Successfully", results: updateFeedbackDoc.data() })
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: 400, message: 'Unable to Update Feedback' });
  }
});

router.delete("/delete", async (req, res) => {

  try {
    const id = req.query.id;
    await passengerModel.doc(id).delete();
    res.send({ status: 200, message: "Feedback Deleted Successfully" });
  } catch (error) {
    res.status(400).send({ status: 400, message: 'Unable to Delete Feedback' });
  }
});

module.exports = router;