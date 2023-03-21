import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private httpClient:HttpClient) { }

  getBookings(){
    let url = environment.Bookings_BASE_URL+environment.BOOKINGS.GET_ALL_BOOKINGS;
    return this.httpClient.get(url);
  }

  getCancelBookings(){
    let url = environment.Bookings_BASE_URL+environment.BOOKINGS.GET_ALL_CANCEL_BOOKINGS;
    return this.httpClient.get(url);
  }

  viewBookings(id){
    let url = environment.Bookings_BASE_URL+environment.BOOKINGS.VIEW_BOOKINGS+id;
    return this.httpClient.get(url);
  }
}
