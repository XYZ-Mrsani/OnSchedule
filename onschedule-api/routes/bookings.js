const express = require('express');
var router = express.Router();
const { Bookings, bookingsModel } = require('../models/bookings.model');

var date = new Date();
let cdate = date.toISOString().slice(0, 10);

router.post("/create", async (req, res) => {

  const { nicnum, fname, lname, phone, from, to, seatnum, busnum, time } = req.body;

  try {
    const newBookings = new Bookings(null, cdate, nicnum, fname, lname, phone, from, to, seatnum, busnum, time);
    const newBookingsDocRef = await bookingsModel.add(newBookings.toFirebaseData());
    const newBookingsDoc = await newBookingsDocRef.get();

    res.send({ status: 200, message: 'Bookings added successfully', BookingsDetails: newBookingsDoc.data() });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: 400, message: 'Unable to Add Bookings' });
  }
});


module.exports = router;