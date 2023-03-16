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

router.get("/list", async (req, res) => {
  try {
    const snapshot = await bookingsModel.get();
    const list = snapshot.docs.map((doc) => Bookings.fromFirestoreData(doc));
    res.send({ status: 200, BookingsDetails: list });
  } catch (error) {
    res.status(400).send({ status: 400, message: 'Unable to Add Bookings' });
  }
});

router.put("/update", async (req, res) => {
  /*const id = req.body.id;
  delete req.body.id;
  const data = req.body;

  await User.doc(id).update(data);
  res.send({ msg: "User Updated" });*/
  try {
    const id = req.query.id;
    const seatnum = req.body;

    const updateBookings = new Bookings(id, seatnum);
    await bookingsModel.doc(id).update(updateBookings.toFirebaseData());

    const updateBookingsDoc = await bookingsModel.doc(id).get();

    res.send({ status: 200, message: "Bookings Updated Successfully", results: updateBookingsDoc.data() })
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: 400, message: 'Unable to Update Bookings' });
  }
});

router.delete("/delete", async (req, res) => {
  /*const id = req.body.id;

  await User.doc(id).delete();
  res.send({ msg: "User Deleted" });*/
  try {
    const id = req.query.id;
    await bookingsModel.doc(id).delete();
    res.send({ status: 200, message: "Booking Deleted Successfully" });
  } catch (error) {
    res.status(400).send({ status: 400, message: 'Unable to Delete Booking' });
  }
});

module.exports = router;