import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(private httpClient:HttpClient) { }

  getFeeback(){
    let url = environment.PASSENGER_BASE_URL+environment.PASSENGER.GET_ALL_FEEDBACK;
    return this.httpClient.get(url);
  }
}
