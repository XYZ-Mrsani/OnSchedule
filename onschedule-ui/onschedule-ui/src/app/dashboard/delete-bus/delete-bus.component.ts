import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BusesService } from '../../services/buses.service';

@Component({
  selector: 'app-delete-bus',
  templateUrl: './delete-bus.component.html',
  styleUrls: ['./delete-bus.component.css']
})
export class DeleteBusComponent implements OnInit {

  constructor(private busService:BusesService) { }

  ngOnInit(): void {

    var logingStatus = localStorage.getItem('usertoken')
    if (logingStatus) {
      let id = window.location.pathname.split("/").pop();
      Swal.fire({
        title: 'Are you sure want to delete the Bus?',
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
            text: "Bus has been deleted.",
            icon: "success",
            confirmButtonColor: "green",
            confirmButtonText: "Ok",
          }).then(() => {
            this.busService.deleteBus(id).subscribe((data: any) => {

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
