import type { Transaction } from "../types";
import { MOCK_TRANSACTIONS } from "./mock-transactions";

let sessionTransactions: Transaction[] | null = null;

export function getDemoSessionTransactions(): Transaction[] {
  if (!sessionTransactions) {
    sessionTransactions = structuredClone(MOCK_TRANSACTIONS);
  }

  return sessionTransactions;
}

export function updateDemoSessionTransactionStatus(
  transactionId: string,
  status: "success" | "failed",
): void {
  const transactions = getDemoSessionTransactions();
  sessionTransactions = transactions.map((transaction) =>
    transaction.id === transactionId ? { ...transaction, status } : transaction,
  );
}
