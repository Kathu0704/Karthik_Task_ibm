export interface Transaction {
  id: number;

  type: "credit" | "debit";

  description: string;

  amount: number;

  date: string;
}

export interface BankState {
  balance: number;
  transactions: Transaction[];
  error: string;
}
