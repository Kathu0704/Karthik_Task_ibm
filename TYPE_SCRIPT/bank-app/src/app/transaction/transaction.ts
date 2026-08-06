import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankService } from '../services/bank';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction.html',
  styleUrl: './transaction.css'
})
export class Transaction implements OnInit {

  transactions: any[] = [];

  constructor(public bank: BankService) {}

  ngOnInit(): void {

  console.log("Transaction component loaded");

  this.bank.getTransactions().subscribe((data: any) => {

    console.log(data);

    this.transactions = data;

  });

}

  delete(id: number) {

    this.bank.deleteTransaction(id).subscribe(() => {

      alert("Transaction Deleted");

      this.ngOnInit();

    });

  }

}