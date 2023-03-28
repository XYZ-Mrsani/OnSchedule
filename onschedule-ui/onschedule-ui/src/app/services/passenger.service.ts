import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(private httpClient: HttpClient) { }

  getFeeback() {
    let url = environment.PASSENGER_BASE_URL + environment.PASSENGER.GET_ALL_FEEDBACK;
    return this.httpClient.get(url);
  }

  viewFeedback(id) {
    let url = environment.PASSENGER_BASE_URL + environment.PASSENGER.VIEW_FEEDBACK + id;
    return this.httpClient.get(url);
  }

  editFeedback(id, pname, datetime, feedback, busnum, busroute) {
    let url = environment.PASSENGER_BASE_URL + environment.PASSENGER.UPDATE + id;
    return this.httpClient.put(url, { pname, datetime, feedback, busnum, busroute });
  }

  deletefeedback(id){
    let url = environment.PASSENGER_BASE_URL + environment.PASSENGER.DELETE + id;
    return this.httpClient.delete(url);
  }
}
