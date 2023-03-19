const express = require('express');
var router = express.Router();
const { Transaction, transactionModel } = require('../models/transaction.model');

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

    const { amount, nicnum, pname, busnum, dt, at, destination } = req.body;

    try {
        const newTransaction = new Transaction(null, datetime, amount, nicnum, pname, busnum, dt, at, destination);
        const newTransactionDocRef = await transactionModel.add(newTransaction.toFirebaseData());
        const newTransactionsDoc = await newTransactionDocRef.get();

        res.send({ status: 200, message: 'Transaction added successfully', TransactionDetails: newTransactionsDoc.data() });
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: 400, message: 'Unable to Add Transaction' });
    }
});

router.get("/list", async (req, res) => {
    try {
        const snapshot = await transactionModel.get();
        const list = snapshot.docs.map((doc) => Transaction.fromFirestoreData(doc));
        const recordCount = list.length;
        res.send({ status: 200, recordCount: recordCount, results: list });
    } catch (error) {
        res.status(400).send({ status: 400, message: 'Unable to list Transaction' });
    }
});

module.exports = router;