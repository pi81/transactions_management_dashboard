import type { TransactionRepository } from "../types";

const NOT_IMPLEMENTED =
  "API data source is not configured. Set NEXT_PUBLIC_DATA_SOURCE=demo or implement the real API calls.";

export const apiTransactionRepository: TransactionRepository = {
  async list() {
    throw new Error(NOT_IMPLEMENTED);
  },

  async downloadInvoice() {
    throw new Error(NOT_IMPLEMENTED);
  },

  async retryPayment() {
    throw new Error(NOT_IMPLEMENTED);
  },
};
