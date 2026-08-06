import { Component } from '@angular/core';
import { BankService } from '../services/bank';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [],
  templateUrl: './transfer.html',
  styleUrl: './transfer.css'
})
export class Transfer {

  constructor(public bank: BankService) {}

  transferMoney(receiver: string, amount: string) {

    const transferAmount = Number(amount);

    // Validation
    if (transferAmount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    if (transferAmount > this.bank.currentUser.balance) {
      alert("Insufficient Balance");
      return;
    }

    // POST - Add transaction
    this.bank.addTransaction({

  userId: this.bank.currentUser.id,
  accountNumber: this.bank.currentUser.accountNumber,
  type: "Transfer",
  receiver: receiver,
  amount: transferAmount

}).subscribe(() => {

      // Calculate new balance
      const newBalance = this.bank.currentUser.balance - transferAmount;

      // PATCH - Update balance
      this.bank.updateBalance(
        this.bank.currentUser.id,
        newBalance
      ).subscribe(() => {

        // Update current user in memory
        this.bank.currentUser.balance = newBalance;

        alert("Transfer Successful");

      });

    });

  }

}