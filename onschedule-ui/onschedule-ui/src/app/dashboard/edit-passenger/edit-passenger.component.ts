import { Component, OnInit } from '@angular/core';
import { PassengerService } from 'src/app/services/passenger.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-passenger',
  templateUrl: './edit-passenger.component.html',
  styleUrls: ['./edit-passenger.component.css']
})

export class EditPassengerComponent implements OnInit {

  vFeedbackDetails: any;
  vFeedbackList: any;


  constructor(private passengerService: PassengerService) { }

  ngOnInit(): void {
    this.viewFeedback();
  }

  viewFeedback() {
    let id = window.location.pathname.split("/").pop();

    this.passengerService.viewFeedback(id).subscribe(data => {
      this.vFeedbackDetails = data;
      this.vFeedbackList = this.vFeedbackDetails.results;
      console.log(this.vFeedbackList);
    });
  }

  updateFeedback(event) {

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

    event.preventDefault();
    const target = event.target

    const pname = target.querySelector(".pname").value
    const feedback = target.querySelector(".feedback").value
    const busnum = target.querySelector(".busnum").value
    const busroute = target.querySelector(".route").value

    let id = window.location.pathname.split("/").pop();

    if (pname == "") {
      Swal.fire({
        title: "Passenger Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else if (feedback == "") {
      Swal.fire({
        title: "Feedback Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else if (busnum == "") {
      Swal.fire({
        title: "Bus Number Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else if (busroute == "") {
      Swal.fire({
        title: "Bus Route Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else {
      this.passengerService.editFeedback(id, pname, datetime, feedback, busnum, busroute).subscribe(data => {
        Swal.fire({
          title: "Feedback Updated Successfully",
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
}
