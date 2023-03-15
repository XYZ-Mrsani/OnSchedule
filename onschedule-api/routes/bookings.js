const express = require('express');
var router = express.Router();
const { Bookings, bookingsModel } = require('../config');

const date = new Date();
let cdate = date.getFullYear();

router.post("/create", async (req, res) => {
  
    const { nicnum, fname, lname, phone, from, to, seatnum, busnum, time } = req.body;
  
    try {
      const newBookings = new Bookings(null, cdate, nicnum, fname, lname, phone, from, to, seatnum, busnum, time);
      const newBookingsDocRef = await bookingsModel.add(newBookings.toFirebaseData());
      const newBookingsDoc = await newBookingsDocRef.get();
  
      res.send({ status: 200, message: 'Bookings added successfully', userDetails: newBookingsDoc.data() });
    } catch (error) {
      res.status(400).send({ status: 400, message: 'Unable to Add Bookings' });
    }
  });


module.exports = router;