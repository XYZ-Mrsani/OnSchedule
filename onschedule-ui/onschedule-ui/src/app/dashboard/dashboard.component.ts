import { Component, NgZone, OnInit } from '@angular/core';
import { BookingsService } from '../../app/services/bookings.service'
import Swal from 'sweetalert2';
import { BusesService } from '../services/buses.service';
import { TransactionService } from '../services/transaction.service';
import { PassengerService } from '../services/passenger.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  BookingsDetails: any;
  bookingsList: any;
  bookingsCount: any;
  BusDetails: any;
  busList: any;
  busesCount: any;
  TransactionDetails: any;
  TransactionCount: any;
  TransactionList: any;
  FeedbackDetails: any;
  FeedbackList: any;
  CBookingsDetails:any;
  CbookingsList:any;
  vBookingsDetails:any;
  vBookingsList:any;


  constructor(private bookingsService: BookingsService, private busesService: BusesService, private transactionService: TransactionService, private passengerService: PassengerService, private ngZone: NgZone) { }

  ngOnInit(): void {

    var logingStatus = localStorage.getItem('usertoken')
    if (logingStatus) {
      this.getBookingsList();
      this.getBusList();
      this.getTransactionList();
      this.getFeedbackList();
      this.getCBookingsList();
      this.viewBookings();
    } else {
      window.location.href = "http://localhost:4200/login";
    }

    setInterval(() => {
      this.ngZone.run(() => {
        this.getBookingsList();
        this.getBusList();
        this.getTransactionList();
        this.getFeedbackList();
        this.getCBookingsList();
      });
    }, 5000);

    $(".sidebar ul li").on("click", function () {
      $(".sidebar ul li.active").removeClass("active");
      $(this).addClass("active");
    });

    $(".open-btn").on("click", function () {
      $(".sidebar").addClass("active");
    });
    $(".close-btn").on("click", function () {
      $(".sidebar").removeClass("active");
    });

    //** Add New Bus */
    $(".save_bus").on("click", function () {
      let Vehicle = $("#Vehicle").val();
      let Driver = $("#Driver").val();
      let Conductor = $("#Conductor").val();
      let Phone = $("#Phone").val();
      let Departure = $("#Departure").val();
      let Arrival = $("#Arrival").val();
      let Availability = $("#Availability").val();

      if (Vehicle == "" && Driver == "" && Conductor == "" && Phone == "" && Departure == "" && Arrival == "") {
        Swal.fire({
          title: "Missing Informations",
          icon: "warning",
          iconColor: "#FFA500",
          confirmButtonColor: "green",
          confirmButtonText: "Ok",
        });
      }
    });


    //** Delete Bookings */
    $(".delete-B").on("click", function () {
      Swal.fire({
        title: "Are you sure want Cancel?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Booking has been deleted.",
            icon: "success",
            confirmButtonColor: "green",
            confirmButtonText: "Ok",
          }).then(() => {
            window.location.href =
              "http://localhost:4200/#bookings";
          });
        }
      });
    });

    //** Delete Bus Details */
    $(".delete-bus").on("click", function () {
      Swal.fire({
        title: "Are you sure want delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Bus has been deleted.",
            icon: "success",
            confirmButtonColor: "green",
            confirmButtonText: "Ok",
          }).then(() => {
            window.location.href =
              "http://localhost:4200/#bus-details";
          });
        }
      });
    });

    //** Delete Feedback */
    $(".delete-f").on("click", function () {
      Swal.fire({
        title: "Are you sure want delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Feedback has been deleted.",
            icon: "success",
            confirmButtonColor: "green",
            confirmButtonText: "Ok",
          }).then(() => {
            window.location.href =
              "http://localhost:4200/#Passenger";
          });
        }
      });
    });
  }

  getBookingsList() {
    this.bookingsService.getBookings().subscribe(data => {
      this.BookingsDetails = data;
      this.bookingsCount = this.BookingsDetails.recordCount;
      this.bookingsList = this.BookingsDetails.results;
      console.log(this.bookingsList);
      console.log(this.bookingsCount);
    });
  }

  getBusList() {
    this.busesService.getBuses().subscribe(data => {
      this.BusDetails = data;
      this.busesCount = this.BusDetails.recordCount;
      this.busList = this.BusDetails.results;
      console.log(this.busList);
      console.log(this.busesCount);
    });
  }

  getTransactionList() {
    this.transactionService.getTransaction().subscribe(data => {
      this.TransactionDetails = data;
      this.TransactionCount = this.TransactionDetails.recordCount;
      this.TransactionList = this.TransactionDetails.results;
      console.log(this.TransactionList);
      console.log(this.TransactionCount);
    });
  }

  getFeedbackList() {
    this.passengerService.getFeeback().subscribe(data => {
      this.FeedbackDetails = data;
      this.FeedbackList = this.FeedbackDetails.results;
      console.log(this.FeedbackList);
    });
  }

  getCBookingsList() {
    this.bookingsService.getCancelBookings().subscribe(data => {
      this.CBookingsDetails = data;
      this.CbookingsList = this.CBookingsDetails.results;
      console.log(this.CbookingsList);
    });
  }

  viewBookings(){
    let id = 'Zl3z5Na9R9dHacNCBMXq';

    this.bookingsService.viewBookings(id).subscribe(data=>{
      this.vBookingsDetails = data;
      this.vBookingsList = this.vBookingsDetails.results;
      console.log(this.vBookingsList);
    });
  }

}
