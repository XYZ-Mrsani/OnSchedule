const express = require('express');
var router = express.Router();
const { Bookings, bookingsModel } = require('../models/bookings.model');
const { CancelBookings, cancelbookingsModel } = require('../models/c_bookings.model');

//var date = new Date();
//let cdate = date.toISOString().slice(0, 10);

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

  const { nicnum, fname, lname, phone, from, to, seatnum, busnum, amount, time } = req.body;

  try {
    const newBookings = new Bookings(null, datetime, nicnum, fname, lname, phone, from, to, seatnum, busnum, amount, time);
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
    const recordCount = list.length;
    res.send({ status: 200, recordCount: recordCount, results: list });
  } catch (error) {
    res.status(400).send({ status: 400, message: 'Unable to list Bookings' });
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

/**add cancel bookings */

/*router.post("/createc", async (req, res) => {

  const { nicnum, fname, lname, phone, from, to, seatnum, busnum, time } = req.body;

  try {
    const newCBookings = new CancelBookings(null, cdate, nicnum, fname, lname, phone, from, to, seatnum, busnum, time);
    const newCBookingsDocRef = await cancelbookingsModel.add(newCBookings.toFirebaseData());
    const newCBookingsDoc = await newCBookingsDocRef.get();

    res.send({ status: 200, message: 'Bookings added successfully', CBookingsDetails: newCBookingsDoc.data() });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: 400, message: 'Unable to Add Bookings' });
  }
});*/

router.get("/listcancel", async (req, res) => {
  try {
    const snapshot = await cancelbookingsModel.get();
    const list = snapshot.docs.map((doc) => CancelBookings.fromFirestoreData(doc));
    const recordCount = list.length;
    res.send({ status: 200, recordCount: recordCount, results: list });
  } catch (error) {
    res.status(400).send({ status: 400, message: 'Unable to list Cancel Bookings' });
  }
});


router.get("/viewbookings", async (req, res) => {

  const id = req.query.id;
  try {
    const snapshot = await bookingsModel.doc(id).get();
    const list = snapshot.data();
    const recordCount = list.length;
    res.send({ status: 200, recordCount: recordCount, results: list });
  } catch (error) {
    res.status(400).send({ status: 400, message: 'Unable to list Bookings' });
  }
});

router.delete("/deletebookings", async (req, res) => {

  try {

    //res.send({ date: datetime });
    const snapshot = await bookingsModel.where('time', '==', datetime).get(); // Get bookings that have already passed
    const deletePromises = snapshot.docs.map(doc => doc.ref.delete()); // Create an array of promises to delete each booking
    await Promise.all(deletePromises); // Delete all bookings asynchronously
    res.send({ status: 200, message: 'Bookings deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 500, message: 'Unable to delete bookings' });
  }

});

module.exports = router;