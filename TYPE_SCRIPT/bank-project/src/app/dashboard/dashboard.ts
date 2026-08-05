import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BankService } from '../bank.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './dashboard.html'
})
export class DashboardComponent {


  balance = 0;

  transactions:any[] = [];

  amount = 0;

  message = '';


  constructor(private bank:BankService) {

    this.load();

  }


  load(){

    this.balance = this.bank.getBalance();

    this.transactions = this.bank.getTransactions();

  }


  transfer(){

    if(this.bank.transfer(this.amount)){

      this.message = "Transfer Successful";

      this.load();

    }
    else{

      this.message = "Insufficient Balance";

    }

  }


}