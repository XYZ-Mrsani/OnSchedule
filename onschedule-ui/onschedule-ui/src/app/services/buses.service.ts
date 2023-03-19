import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class BusesService {

  constructor(private httpClient:HttpClient) { }

  getBuses(){
    let url = environment.BUSES_BASE_URL+environment.BUSES.GET_ALL_BUSES;
    return this.httpClient.get(url);
  }
}
