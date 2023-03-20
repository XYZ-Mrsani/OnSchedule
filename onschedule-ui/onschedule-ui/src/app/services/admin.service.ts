import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  login(username, password) {
    let url = environment.ADMIN_BASE_URL + environment.ADMIN.LOGIN;
    return this.httpClient.post(url, { username, password });
  }

}

