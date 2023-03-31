import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-edit-bookings',
  templateUrl: './edit-bookings.component.html',
  styleUrls: ['./edit-bookings.component.css']
})
export class EditBookingsComponent implements OnInit, AfterViewInit {

  vBookingsDetails: any;
  vBookingsList: any;

  constructor(private bookingService: BookingsService) { }

  ngOnInit(): void {
    this.viewBookings();

    /**JS */


    /** */
  }

  ngAfterViewInit(): void {
    const container = document.querySelector('.container-m');
    const seats = Array.from(document.querySelectorAll('.row .seat:not(.occupied'));

    populateUI();


    // update total and count
    function updateSelectedCount() {
      const selectedSeats = document.querySelectorAll('.row .seat.selected');

      const seatsIndex = Array.from(selectedSeats).map((seat) => seats.indexOf(seat));

      localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    }

    // get data from localstorage and populate ui
    function populateUI() {
      const selectedSeats = localStorage.getItem('selectedSeats');
      if (selectedSeats !== null) {
        const prasedSeats = JSON.parse(selectedSeats);
        if (prasedSeats.length > 0) {
          seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index.toString()) > -1) {
              seat.classList.add('selected');
            }
          });
        }
      }
    }


    // Seat click event
    if (container) {
      container.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target && target.classList.contains('seat') && !target.classList.contains('occupied')) {
          target.classList.toggle('selected');

          updateSelectedCount();
        }
      });
    }

    // intial count and total
    updateSelectedCount();
  }

  viewBookings() {
    let id = window.location.pathname.split("/").pop();

    this.bookingService.viewBookings(id).subscribe(data => {
      this.vBookingsDetails = data;
      this.vBookingsList = this.vBookingsDetails.results;
      console.log(this.vBookingsList);
    });
  }

}
