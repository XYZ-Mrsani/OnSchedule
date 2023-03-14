import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {

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

}
