import type { Transaction } from "./types.ts";

export function useBankingStats(transactions: Transaction[]) {
  const totalCredits = transactions
    .filter((t) => t.type === "credit")
    .reduce((s, t) => s + t.amount, 0);

  const totalDebits = transactions
    .filter((t) => t.type === "debit")
    .reduce((s, t) => s + t.amount, 0);

  const transactionCount = transactions.length;

  return { totalCredits, totalDebits, transactionCount };
}