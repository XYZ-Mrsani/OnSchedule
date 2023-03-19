import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient) { }

  getTransaction() {
    let url = environment.TRANSACTION_BASE_URL + environment.TRANSACTION.GET_ALL_TRANSACTION;
    return this.httpClient.get(url);
  }
}
