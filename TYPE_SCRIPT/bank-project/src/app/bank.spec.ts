import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  balance:number = 50000;

  transactions:any[] = [
    {
      date:'01-08-2026',
      description:'ATM Withdrawal',
      amount:2000
    },
    {
      date:'02-08-2026',
      description:'Salary Credit',
      amount:30000
    }
  ];


  login(account:string,password:string){

    if(account && password === '1234567891'){
      return true;
    }

    return false;
  }


  transfer(amount:number){

    if(amount <= this.balance){

      this.balance = this.balance - amount;

      this.transactions.push({
        date:new Date(),
        description:'Fund Transfer',
        amount:-amount
      });

      return true;
    }

    return false;
  }


  getBalance(){
    return this.balance;
  }


  getTransactions(){
    return this.transactions;
  }

}