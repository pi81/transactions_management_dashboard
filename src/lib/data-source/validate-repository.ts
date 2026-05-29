import { parseRetryResult, parseTransactions } from "./schemas";
import type { TransactionRepository } from "./types";

export function withValidatedResponses(
  repository: TransactionRepository,
): TransactionRepository {
  return {
    ...repository,
    async list() {
      return parseTransactions(await repository.list());
    },
    async retryPayment(transactionId) {
      return parseRetryResult(await repository.retryPayment(transactionId));
    },
  };
}
