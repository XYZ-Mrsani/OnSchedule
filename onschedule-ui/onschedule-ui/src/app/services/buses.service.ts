import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class BusesService {

  constructor(private httpClient: HttpClient) { }

  getBuses() {
    let url = environment.BUSES_BASE_URL + environment.BUSES.GET_ALL_BUSES;
    return this.httpClient.get(url);
  }

  addBuses(vnum, dname, cname, phone, route, dt, at, availability, price) {
    let url = environment.BUSES_BASE_URL + environment.BUSES.ADD_BUS;
    return this.httpClient.post(url, { vnum, dname, cname, phone, route, dt, at, availability, price });
  }

  viewBus(id) {
    let url = environment.BUSES_BASE_URL + environment.BUSES.VIEW_BUS + id;
    return this.httpClient.get(url);
  }

  editBus(id, vnum, dname, cname, phone, route, dt, at, availability, price, sstatus) {
    let url = environment.BUSES_BASE_URL + environment.BUSES.UPDATE + id;
    return this.httpClient.put(url, { vnum, dname, cname, phone, route, dt, at, availability, price, sstatus });
  }

  deleteBus(id) {
    let url = environment.BUSES_BASE_URL + environment.BUSES.DELETE + id;
    return this.httpClient.delete(url);
  }
}
