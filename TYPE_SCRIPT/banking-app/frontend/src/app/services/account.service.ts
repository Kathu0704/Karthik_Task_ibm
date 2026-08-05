import { Injectable } from '@angular/core';

export interface Account {
  id: number;
  accountNumber: string;
  accountHolderName: string;
  balance: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: string;
}

export interface TransferResult {
  success: boolean;
  message: string;
  balance: number;
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  private account: Account = {
    id: 101,
    accountHolderName: 'Karthik',
    accountNumber: 'ACC1001',
    balance: 50000,
  };

  private transactions: Transaction[] = [
    {
      id: 'TXN1001',
      date: '05 Aug',
      description: 'Salary Credit',
      amount: 45000,
      status: 'Success',
    },
    {
      id: 'TXN1002',
      date: '04 Aug',
      description: 'Electricity Bill',
      amount: -2500,
      status: 'Paid',
    },
    {
      id: 'TXN1003',
      date: '03 Aug',
      description: 'Shopping',
      amount: -4200,
      status: 'Completed',
    },
    {
      id: 'TXN1004',
      date: '02 Aug',
      description: 'Interest',
      amount: 1250,
      status: 'Success',
    },
  ];

  getAccount(): Account {
    return this.account;
  }

  getBalance(): number {
    return this.account.balance;
  }

  getTransactions(): Transaction[] {
    return [...this.transactions];
  }

  transfer(targetAccountNumber: string, amount: number): TransferResult {
    const normalizedTarget = targetAccountNumber.trim();

    if (!normalizedTarget) {
      return {
        success: false,
        message: 'Please enter a target account number.',
        balance: this.account.balance,
      };
    }

    if (amount <= 0) {
      return {
        success: false,
        message: 'Please enter a valid transfer amount.',
        balance: this.account.balance,
      };
    }

    if (amount > this.account.balance) {
      return {
        success: false,
        message: 'Insufficient balance for this transfer.',
        balance: this.account.balance,
      };
    }

    this.account.balance -= amount;
    const transaction: Transaction = {
      id: `TXN${1000 + this.transactions.length + 1}`,
      date: new Date().toLocaleDateString('en-GB'),
      description: `Transfer to ${normalizedTarget}`,
      amount: -amount,
      status: 'Success',
    };
    this.transactions.unshift(transaction);

    return {
      success: true,
      message: `₹${amount.toLocaleString()} sent to ${normalizedTarget}.`,
      balance: this.account.balance,
    };
  }
}
