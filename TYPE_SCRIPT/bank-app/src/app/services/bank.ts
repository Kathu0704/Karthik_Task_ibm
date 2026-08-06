import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  apiUrl = "http://localhost:3000";
  currentUser:any;


  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.apiUrl + "/users");
  }

  getTransactions() {
    return this.http.get(this.apiUrl + "/transactions");
  }

  addTransaction(data: any) {
    return this.http.post(this.apiUrl + "/transactions", data);
  }

  deleteTransaction(id: number) {
    return this.http.delete(this.apiUrl + "/transactions/" + id);
  }

  updateBalance(id: number, balance: number) {
    return this.http.patch(this.apiUrl + "/users/" + id, {
      balance: balance
    });
  }
   registerUser(data:any){

 return this.http.post(
   this.apiUrl + "/users",
   data
 );

}

}