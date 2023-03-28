import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-delete-bookings',
  templateUrl: './delete-bookings.component.html',
  styleUrls: ['./delete-bookings.component.css']
})
export class DeleteBookingsComponent implements OnInit {

  constructor(private bookingService:BookingsService){}

  ngOnInit(): void {
    var logingStatus = localStorage.getItem('usertoken')
    if (logingStatus) {
      let id = window.location.pathname.split("/").pop();
      Swal.fire({
        title: 'Are you sure want to Cancel the Booking?',
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
            text: "Booking has been deleted.",
            icon: "success",
            confirmButtonColor: "green",
            confirmButtonText: "Ok",
          }).then(() => {
            this.bookingService.dBookings(id).subscribe((data: any) => {

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
