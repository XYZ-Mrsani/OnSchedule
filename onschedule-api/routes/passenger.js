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

module.exports = router;