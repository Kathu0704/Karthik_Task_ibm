import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Transfer } from '../transfer/transfer';
import { Transaction } from '../transaction/transaction';
import { AccountMaskPipe } from '../pipes/account-mask-pipe';
import { BankService } from '../services/bank';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    Transfer,
    Transaction,
    CurrencyPipe,
    AccountMaskPipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {


  user: any;

  exchangeRate: number = 95.15;


  constructor(public bank: BankService) {}


  ngOnInit(): void {

    // Get logged-in user
    this.user = this.bank.currentUser;

  }


  get accountNumber(): string {

    return this.bank.currentUser?.accountNumber || '';

  }


  getBalanceInUSD(): number {

    if (!this.bank.currentUser) {
      return 0;
    }

    return this.bank.currentUser.balance / this.exchangeRate;

  }

}