import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './transaction-details.html',
  styleUrls: ['./transaction-details.css']
})
export class TransactionDetailsComponent {}