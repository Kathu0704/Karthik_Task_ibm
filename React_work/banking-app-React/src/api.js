// src/api.js
// Mock "backend" for the demo banking app.
// In a real app these functions would call fetch()/axios against a live API.
// Here they simulate network latency with setTimeout and keep state in memory.

let accounts = [
  {
    id: "acc-checking",
    name: "Everyday Checking",
    type: "Checking",
    balance: 4820.55,
    accountNumber: "**** 4821",
  },
  {
    id: "acc-savings",
    name: "High-Yield Savings",
    type: "Savings",
    balance: 15230.12,
    accountNumber: "**** 7734",
  },
];

let transactions = [
  { id: "t1", accountId: "acc-checking", date: "2026-08-10", description: "Green Leaf Grocery", amount: -64.32 },
  { id: "t2", accountId: "acc-checking", date: "2026-08-09", description: "Payroll Deposit", amount: 2100.0 },
  { id: "t3", accountId: "acc-checking", date: "2026-08-07", description: "Electric Utility", amount: -88.4 },
  { id: "t4", accountId: "acc-savings", date: "2026-08-05", description: "Interest Payment", amount: 12.87 },
  { id: "t5", accountId: "acc-checking", date: "2026-08-02", description: "Coffee Roasters", amount: -5.75 },
  { id: "t6", accountId: "acc-savings", date: "2026-07-28", description: "Transfer from Checking", amount: 500.0 },
];

const LATENCY = 500;

function delay(value, ms = LATENCY) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// GET /accounts
export function getAccounts() {
  return delay(accounts.map((a) => ({ ...a })));
}

// GET /accounts/:id
export function getAccountById(accountId) {
  const account = accounts.find((a) => a.id === accountId);
  return delay(account ? { ...account } : null);
}

// GET /transactions?accountId=
export function getTransactions(accountId) {
  const filtered = accountId
    ? transactions.filter((t) => t.accountId === accountId)
    : transactions;
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return delay(sorted);
}

// POST /transfer
export function transferFunds({ fromAccountId, toAccountId, amount }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const from = accounts.find((a) => a.id === fromAccountId);
      const to = accounts.find((a) => a.id === toAccountId);
      const numericAmount = Number(amount);

      if (!from || !to) {
        reject(new Error("Invalid account selection."));
        return;
      }
      if (!numericAmount || numericAmount <= 0) {
        reject(new Error("Enter an amount greater than zero."));
        return;
      }
      if (from.id === to.id) {
        reject(new Error("Choose two different accounts."));
        return;
      }
      if (from.balance < numericAmount) {
        reject(new Error("Insufficient funds in the source account."));
        return;
      }

      from.balance = Number((from.balance - numericAmount).toFixed(2));
      to.balance = Number((to.balance + numericAmount).toFixed(2));

      const today = new Date().toISOString().slice(0, 10);
      transactions.unshift({
        id: `t${transactions.length + 1}`,
        accountId: from.id,
        date: today,
        description: `Transfer to ${to.name}`,
        amount: -numericAmount,
      });
      transactions.unshift({
        id: `t${transactions.length + 1}`,
        accountId: to.id,
        date: today,
        description: `Transfer from ${from.name}`,
        amount: numericAmount,
      });

      resolve({ from: { ...from }, to: { ...to } });
    }, LATENCY);
  });
}
