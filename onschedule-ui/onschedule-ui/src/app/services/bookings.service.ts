import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private httpClient: HttpClient) { }

  getBookings() {
    let url = environment.Bookings_BASE_URL + environment.BOOKINGS.GET_ALL_BOOKINGS;
    return this.httpClient.get(url);
  }

  getCancelBookings() {
    let url = environment.Bookings_BASE_URL + environment.BOOKINGS.GET_ALL_CANCEL_BOOKINGS;
    return this.httpClient.get(url);
  }

  viewBookings(id) {
    let url = environment.Bookings_BASE_URL + environment.BOOKINGS.VIEW_BOOKINGS + id;
    return this.httpClient.get(url);
  }
  dBookings(id) {
    let url = environment.Bookings_BASE_URL + environment.BOOKINGS.DELETE + id;
    return this.httpClient.delete(url);
  }

  deleteBookings() {
    let url = environment.Bookings_BASE_URL + environment.BOOKINGS.DELETE_BOOKINGS;
    return this.httpClient.delete(url);
  }

  editBookings(id, datetime, nicnum, fname, lname, phone, from, to, seatnum, busnum, amount, time) {
    let url = environment.Bookings_BASE_URL + environment.BOOKINGS.UPDATE + id;
    return this.httpClient.put(url, { datetime, nicnum, fname, lname, phone, from, to, seatnum, busnum, amount, time })
  }

  vBooking(nicnum) {
    let url = environment.Bookings_BASE_URL + environment.BOOKINGS.V_BOOKING + nicnum;
    return this.httpClient.get(url);
  }

  vCancel(nicnum) {
    let url = environment.Bookings_BASE_URL + environment.BOOKINGS.V_C_BOOKING + nicnum;
    return this.httpClient.get(url);
  }
}
