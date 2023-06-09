import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import Swal from 'sweetalert2';
import { BusesService } from 'src/app/services/buses.service';
import { data } from 'jquery';

@Component({
  selector: 'app-edit-bookings',
  templateUrl: './edit-bookings.component.html',
  styleUrls: ['./edit-bookings.component.css']
})
export class EditBookingsComponent implements OnInit, AfterViewInit {

  vBookingsDetails: any;
  vBookingsList: any;
  vBusDetails: any;
  vBusList: any;

  constructor(private bookingService: BookingsService, private busService: BusesService) { }

  ngOnInit(): void {
    this.viewBookings();

    /**JS */


    /** */
  }

  ngAfterViewInit(): void {
    const container = document.querySelector('.container-m');
    const seats = Array.from(document.querySelectorAll('.row .seat:not(.occupied'));



    // Seat click event
    if (container) {
      container.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target && target.classList.contains('seat') && !target.classList.contains('occupied')) {
          target.classList.toggle('selected');

          let seatnum = document.querySelector('.seatnum') as HTMLInputElement;
          if (seatnum !== null) {
            const numSeats = seatnum.value.split(',').length;

          }
        }
      });
    }

    // intial count and total

  }

  viewBookings() {
    let id = window.location.pathname.split("/").pop();

    this.bookingService.viewBookings(id).subscribe(data => {
      this.vBookingsDetails = data;
      this.vBookingsList = this.vBookingsDetails.results;
      console.log(this.vBookingsList);

      this.vBus();
    });
  }

  vBus() {
    const busnumber = this.vBookingsList.busnum;
    this.busService.vbus(busnumber).subscribe(data => {
      this.vBusDetails = data;
      this.vBusList = this.vBusDetails.results[0];
      console.log(this.vBusList);
    });
  }

  updateSeat(event) {
    event.preventDefault();
    const target = event.target

    const seats = Array.from(document.querySelectorAll('.row .seat:not(.occupied'));

    function updateSelectedCount() {
      const selectedSeats = document.querySelectorAll('.row .seat.selected');

      const seatCount = selectedSeats.length;

      const seatsIndex = Array.from(selectedSeats).map((seat) => seats.indexOf(seat));

      localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

      const selectedSeatsList = document.getElementById('selected-seats')!;
      const seatNumbers = Array.from(selectedSeats).map((seat) => seat.getAttribute('data-seat')).join(',');
      //selectedSeatsList.innerText = seatNumbers;

      return seatCount;
      //return seatNumbers;
    }

    let seatnum = document.querySelector('.seatnum') as HTMLInputElement;
    if (seatnum !== null) {
      const numSeats = seatnum.value.split(',').length;

      const selectedseatCount = updateSelectedCount();

      if (numSeats != selectedseatCount) {
        Swal.fire({
          title: "Please Select Correct Number Of Seats",
          icon: "warning",
          iconColor: "#FFA500",
          confirmButtonColor: "green",
          confirmButtonText: "Ok",
        });
      } else {
        const datetime = document.querySelector(".datetime") as HTMLInputElement
        const nicnum = document.querySelector(".nicnum") as HTMLInputElement
        const name = document.querySelector(".name") as HTMLInputElement
        const phone = document.querySelector(".phone") as HTMLInputElement
        const route = document.querySelector(".route") as HTMLInputElement
        const cseat = document.querySelector(".seatnum") as HTMLInputElement

        const busnum = document.querySelector(".busnum") as HTMLInputElement
        const amount = document.querySelector(".amount") as HTMLInputElement
        const time = document.querySelector(".time") as HTMLInputElement

        let id = window.location.pathname.split("/").pop();

        let datetimev = datetime.value;
        let nicnumv = nicnum.value;
        let [fname, lname] = name.value.split(" ");
        let phonev = phone.value;
        let [from, to] = route.value.split("-");
        const selectedSeats = document.querySelectorAll('.row .seat.selected');
        let seatnumv = Array.from(selectedSeats).map((seat) => seat.getAttribute('data-seat')).join(',');
        let busnumv = busnum.value;
        let amountv = amount.value;
        let timev = time.value;
        let cS = cseat.value;

        // console.log(seatnumv);
        const seat = seatnumv.split(',');
        const CSeat = cS.split(',');
        //console.log(seat);
        //console.log(this.vBusList.id);
        //console.log(CSeat);

        const newSeatStatus = Array.from({ length: this.vBusList.sstatus.length }, (_, index) => {
          const seatNumber = index + 1;
          const existingStatus = this.vBusList.sstatus[index];

          if (existingStatus === '0' && !seat.includes(seatNumber.toString())) {
            return '0';
          } else if (CSeat.includes(seatNumber.toString())) {
            return '1';
          } else {
            return seat.includes(seatNumber.toString()) ? '0' : existingStatus;
          }
        });


        console.log(newSeatStatus);

        this.busService.updateSeatStatus(this.vBusList.id, this.vBusList.vnum, this.vBusList.dname, this.vBusList.cname, this.vBusList.phone, this.vBusList.route, this.vBusList.dt, this.vBusList.at, this.vBusList.availability, this.vBusList.price, newSeatStatus).subscribe(data => {
          console.log(data);
        });

        //alert(datetimev + " " + nicnumv + " " + namev + " " + phonev + " " + routev + " " + seatnumv + " " + busnumv + " " + amountv + " " + timev + " " + id);

        this.bookingService.editBookings(id, datetimev, nicnumv, fname, lname, phonev, from, to, seatnumv, busnumv, amountv, timev).subscribe(data => {
          Swal.fire({
            title: "Seat Numbers Updated Successfully",
            icon: "success",
            iconColor: "green",
            confirmButtonColor: "green",
            confirmButtonText: "Ok",
          }).then(function () {
            window.location.href = "http://localhost:4200/dashboard/edit/" + id;
          });
          console.log(data);
        });
      }

    }

    updateSelectedCount();
  }

}
