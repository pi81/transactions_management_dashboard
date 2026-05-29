import type { RetryResult, Transaction } from "./schemas";

export type { RetryResult, Transaction, TransactionStatus } from "./schemas";

export type TransactionRepository = {
  list(): Promise<Transaction[]>;
  downloadInvoice(transactionId: string): Promise<Blob>;
  retryPayment(transactionId: string): Promise<RetryResult>;
};

export type DataSource = "demo" | "api";
