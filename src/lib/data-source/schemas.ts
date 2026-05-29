import { z } from "zod";

export const TransactionSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  createdAt: z.iso.datetime(),
  status: z.enum(["success", "failed", "pending"]),
});

export const TransactionsSchema = z.array(TransactionSchema);

export const RetryResultSchema = z.object({
  transactionId: z.string(),
  status: z.enum(["success", "failed"]),
});

export type Transaction = z.infer<typeof TransactionSchema>;
export type RetryResult = z.infer<typeof RetryResultSchema>;
export type TransactionStatus = Transaction["status"];

export function parseTransactions(data: unknown): Transaction[] {
  return TransactionsSchema.parse(data);
}

export function parseRetryResult(data: unknown): RetryResult {
  return RetryResultSchema.parse(data);
}
