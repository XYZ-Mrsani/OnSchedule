import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BookingsService } from '../../services/bookings.service';
import { ActivatedRoute } from '@angular/router';
import { BusesService } from 'src/app/services/buses.service';

@Component({
  selector: 'app-delete-bookings',
  templateUrl: './delete-bookings.component.html',
  styleUrls: ['./delete-bookings.component.css']
})
export class DeleteBookingsComponent implements OnInit {

  vBusDetails: any;
  vBusList: any;

  constructor(private bookingService: BookingsService, private busService: BusesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.vBus();
    var logingStatus = localStorage.getItem('usertoken')
    if (logingStatus) {
      let id = this.route.snapshot.paramMap.get('id');
      let seatnum = this.route.snapshot.paramMap.get('seatnum');
      //window.location.pathname.split("/").pop();
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

            const seatnumbers = seatnum?.split(',');

            seatnumbers?.forEach(seatnumber => {
              const index = parseInt(seatnumber) - 1;
              this.vBusList.sstatus[index] = '1';
            });

            console.log(this.vBusList.sstatus);

            this.busService.updateSeatStatus(this.vBusList.id, this.vBusList.vnum, this.vBusList.dname, this.vBusList.cname, this.vBusList.phone, this.vBusList.route, this.vBusList.dt, this.vBusList.at, this.vBusList.availability, this.vBusList.price, this.vBusList.sstatus).subscribe(data => {
              console.log(data);
            });

            this.bookingService.dBookings(id).subscribe((data: any) => {
              window.location.href = "http://localhost:4200/dashboard#bookings";
            });
          });
        } else {
          window.location.href = "http://localhost:4200/dashboard#bookings";
        }
      })
    } else {
      window.location.href = "http://localhost:4200/login";
    }
  }

  vBus() {
    const busnumber = this.route.snapshot.paramMap.get('busnum');
    this.busService.vbus(busnumber).subscribe(data => {
      this.vBusDetails = data;
      this.vBusList = this.vBusDetails.results[0];
      console.log(this.vBusList);
    });
  }

}
