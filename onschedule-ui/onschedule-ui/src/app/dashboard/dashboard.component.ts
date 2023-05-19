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
  CBookingsDetails: any;
  CbookingsList: any;
  vBookingsDetails: any;
  vBookingsList: any;
  vBDetails: any;
  vBList: any;
  searchResults: any;
  vBusDetails: any;
  vBusList: any;
  Tdetails: any;
  Tlist: any;
  Fdetails: any;
  Flist: any;
  Cdetails: any;
  Clist: any;

  searchTerm: string = '';
  searchTerm1: String = '';
  searchTerm2: String = '';
  searchTerm3: String = '';
  searchTerm4: String = '';
  refreshIntervalId: any;
  loading: boolean = false;

  rfBtn: any;


  constructor(private bookingsService: BookingsService, private busesService: BusesService, private transactionService: TransactionService, private passengerService: PassengerService, private ngZone: NgZone) { }

  ngOnInit(): void {

    var logingStatus = localStorage.getItem('usertoken')
    if (logingStatus) {
      this.getBookingsList();
      this.getBusList();
      this.getTransactionList();
      this.getFeedbackList();
      this.getCBookingsList();
      this.deleteBooking();
    } else {
      window.location.href = "http://localhost:4200/login";
    }

    /*this.refreshIntervalId = setInterval(() => {
      this.ngZone.run(() => {
        if (this.searchResults) {
          this.bookingsList = this.searchResults; // Use search results
        } else {
          this.getBookingsList();
          this.getBusList();
          this.getTransactionList();
          this.getFeedbackList();
          this.getCBookingsList();
          this.deleteBooking();
        }
      });
    }, 3000);*/

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

  deleteBooking() {
    this.bookingsService.deleteBookings().subscribe(data => {
      console.log(data);
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

  addNewBus(event) {
    event.preventDefault();
    const target = event.target

    const vnum = target.querySelector(".vnum").value
    const dname = target.querySelector(".dname").value
    const cname = target.querySelector(".cname").value
    const phone = target.querySelector(".phone").value
    const route = target.querySelector(".route").value
    const dt = target.querySelector(".dt").value
    const at = target.querySelector(".at").value
    const availability = target.querySelector(".availability:checked").value
    const price = target.querySelector(".price").value

    const [rdt, rat] = route.split(" - ");


    if (vnum == "") {
      Swal.fire({
        title: "Vehicle Number Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else if (dname == "") {
      Swal.fire({
        title: "Driver Name Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else if (cname == "") {
      Swal.fire({
        title: "Conductor Name Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else if (phone == "") {
      Swal.fire({
        title: "Phone Number Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else if (route == "") {
      Swal.fire({
        title: "Route Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else if (dt == "") {
      Swal.fire({
        title: "Departure Time Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    }
    else if (at == "") {
      Swal.fire({
        title: "Arrival Time Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else if (price == "") {
      Swal.fire({
        title: "Ticket Price Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else {
      this.busesService.addBuses(vnum, dname, cname, phone, route, rdt + " - " + dt, rat + " - " + at, availability, price).subscribe(data => {
        Swal.fire({
          title: "Bus Successfuly Adedd",
          icon: "success",
          iconColor: "green",
          confirmButtonColor: "green",
          confirmButtonText: "Ok",
        }).then(function () {
          window.location.href = "http://localhost:4200/dashboard";
        });
        console.log(data);
      });
    }
  }

  searchMe() {
    if (this.searchTerm == '') {
      Swal.fire({
        title: "Please! Enter Passenger NIC Number to Search",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else {
      this.bookingsService.vBooking(this.searchTerm).subscribe(data => {
        this.vBDetails = data;
        this.vBList = this.vBDetails.results;
        console.log(this.vBList);
        if (this.vBList.length == 0) {
          Swal.fire({
            title: "No bookings found!",
            icon: "warning",
            iconColor: "#FFA500",
            confirmButtonColor: "green",
            confirmButtonText: "Ok",
          });
        } else {
          this.bookingsList = this.vBList;
        }
        // clearInterval(this.rfBtn);
        // clearInterval(this.refreshIntervalId);
      });
    }
  }

  searchBus() {
    if (this.searchTerm1 == '') {
      Swal.fire({
        title: "Please! Enter Bus Number to Search",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else {
      this.busesService.vbus(this.searchTerm1).subscribe(data => {
        this.vBusDetails = data;
        this.vBusList = this.vBusDetails.results;
        console.log(this.vBusList);

        if (this.vBusList.length == 0) {
          Swal.fire({
            title: "No Bus found this vehicle number!",
            icon: "warning",
            iconColor: "#FFA500",
            confirmButtonColor: "green",
            confirmButtonText: "Ok",
          });
        } else {
          this.busList = this.vBusList;
        }
      });
    }
  }

  searchT() {
    if (this.searchTerm2 == '') {
      Swal.fire({
        title: "Please! Enter NIC Number to Search",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else {
      this.transactionService.viewTransaction(this.searchTerm2).subscribe(data => {
        this.Tdetails = data;
        this.Tlist = this.Tdetails.results;
        console.log(this.Tlist);

        if (this.Tlist.length == 0) {
          Swal.fire({
            title: "No Transaction found!",
            icon: "warning",
            iconColor: "#FFA500",
            confirmButtonColor: "green",
            confirmButtonText: "Ok",
          });
        } else {
          this.TransactionList = this.Tlist;
        }
      });
    }
  }

  searchFeedback() {
    if (this.searchTerm3 == '') {
      Swal.fire({
        title: "Please! Enter Bus Number to Search",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else {
      this.passengerService.vFeedback(this.searchTerm3).subscribe(data => {
        this.Fdetails = data;
        this.Flist = this.Fdetails.results;
        console.log(this.Flist);

        if (this.Flist.length == 0) {
          Swal.fire({
            title: "No Feedback found!",
            icon: "warning",
            iconColor: "#FFA500",
            confirmButtonColor: "green",
            confirmButtonText: "Ok",
          });
        } else {
          this.FeedbackList = this.Flist;
        }
      });
    }
  }

  searchCB() {
    if (this.searchTerm4 == '') {
      Swal.fire({
        title: "Please! Enter Passenher NIC Number to Search",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else {
      this.bookingsService.vCancel(this.searchTerm4).subscribe(data => {
        this.Cdetails = data;
        this.Clist = this.Cdetails.results;
        console.log(this.Clist);

        if (this.Clist.length == 0) {
          Swal.fire({
            title: "No Transaction found!",
            icon: "warning",
            iconColor: "#FFA500",
            confirmButtonColor: "green",
            confirmButtonText: "Ok",
          });
        } else {
          this.CbookingsList = this.Clist;
        }
      });
    }
  }

  refresh() {

    this.searchResults = '';
    this.searchTerm = '';
    this.getBookingsList();
    this.getBusList();
    this.getTransactionList();
    this.getFeedbackList();
    this.getCBookingsList();
    this.deleteBooking();

    /*this.rfBtn = setInterval(() => {
      this.ngZone.run(() => {
        this.getBookingsList();
        this.getBusList();
        this.getTransactionList();
        this.getFeedbackList();
        this.getCBookingsList();
        this.deleteBooking();
        // }
      });
    }, 3000);*/
  }

  refreshBus() {
    this.searchResults = '';
    this.searchTerm1 = '';
    this.getBookingsList();
    this.getBusList();
    this.getTransactionList();
    this.getFeedbackList();
    this.getCBookingsList();
    this.deleteBooking();
  }

  refreshT() {
    this.searchResults = '';
    this.searchTerm2 = '';
    this.getBookingsList();
    this.getBusList();
    this.getTransactionList();
    this.getFeedbackList();
    this.getCBookingsList();
    this.deleteBooking();
  }
  refreshF() {
    this.searchResults = '';
    this.searchTerm3 = '';
    this.getBookingsList();
    this.getBusList();
    this.getTransactionList();
    this.getFeedbackList();
    this.getCBookingsList();
    this.deleteBooking();
  }

  refreshC() {
    this.searchResults = '';
    this.searchTerm3 = '';
    this.getBookingsList();
    this.getBusList();
    this.getTransactionList();
    this.getFeedbackList();
    this.getCBookingsList();
    this.deleteBooking();
  }

}
