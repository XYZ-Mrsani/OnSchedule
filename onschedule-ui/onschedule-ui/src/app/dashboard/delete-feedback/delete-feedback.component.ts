import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PassengerService } from '../../services/passenger.service';

@Component({
  selector: 'app-delete-feedback',
  templateUrl: './delete-feedback.component.html',
  styleUrls: ['./delete-feedback.component.css']
})
export class DeleteFeedbackComponent implements OnInit {

  constructor(private passengerService: PassengerService) { }

  ngOnInit(): void {
    var logingStatus = localStorage.getItem('usertoken')
    if (logingStatus) {
      let id = window.location.pathname.split("/").pop();
      Swal.fire({
        title: 'Are you sure want to delete the Feedback?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Feedback has been deleted.",
            icon: "success",
            confirmButtonColor: "green",
            confirmButtonText: "Ok",
          }).then(() => {
            this.passengerService.deletefeedback(id).subscribe((data: any) => {

              window.location.href = "http://localhost:4200/dashboard/";
            })
          })
        } else {
          window.location.href = "http://localhost:4200/dashboard";
        }
      })
    } else {
      window.location.href = "http://localhost:4200/login";
    }
  }

}
