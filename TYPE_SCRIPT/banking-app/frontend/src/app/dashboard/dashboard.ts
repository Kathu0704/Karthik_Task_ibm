import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AccountService, Transaction } from '../services/account.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  balance = 0;
  transactions: Transaction[] = [];
  targetAccount = '';
  transferAmount = 0;
  message = '';
  success = true;

  constructor(private accountService: AccountService) {
    this.balance = accountService.getBalance();
    this.transactions = accountService.getTransactions();
  }

  transferFunds(): void {
    const amount = Number(this.transferAmount);
    const result = this.accountService.transfer(this.targetAccount, amount);
    this.message = result.message;
    this.success = result.success;
    this.balance = result.balance;
    this.transactions = this.accountService.getTransactions();
  }
}