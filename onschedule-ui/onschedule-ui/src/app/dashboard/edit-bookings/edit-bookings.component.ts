import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-edit-bookings',
  templateUrl: './edit-bookings.component.html',
  styleUrls: ['./edit-bookings.component.css']
})
export class EditBookingsComponent implements OnInit {

  vBookingsDetails:any;
  vBookingsList:any;

  constructor(private bookingService:BookingsService){}

  ngOnInit(): void {
    this.viewBookings();
  }

  viewBookings(){
    let id = window.location.pathname.split("/").pop();

    this.bookingService.viewBookings(id).subscribe(data=>{
      this.vBookingsDetails = data;
      this.vBookingsList = this.vBookingsDetails.results;
      console.log(this.vBookingsList);
    });
  }

}
