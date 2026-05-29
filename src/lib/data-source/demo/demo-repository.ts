import { createInvoicePdf } from "@/lib/invoice-pdf";
import type { TransactionRepository } from "../types";
import {
  INVOICE_GENERATION_MS,
  LIST_LOAD_DELAY_MS,
  RETRY_DELAY_MAX_MS,
  RETRY_DELAY_MIN_MS,
  RETRY_FAILURE_RATE,
  randomDelay,
  randomFailure,
  sleep,
} from "./demo-delays";
import {
  getDemoSessionTransactions,
  updateDemoSessionTransactionStatus,
} from "./demo-session";

export const demoTransactionRepository: TransactionRepository = {
  async list() {
    await sleep(LIST_LOAD_DELAY_MS);
    return getDemoSessionTransactions();
  },

  async downloadInvoice(transactionId) {
    await sleep(INVOICE_GENERATION_MS);
    return createInvoicePdf(transactionId);
  },

  async retryPayment(transactionId) {
    await randomDelay(RETRY_DELAY_MIN_MS, RETRY_DELAY_MAX_MS);
    const hasFailed = randomFailure(RETRY_FAILURE_RATE);
    const status = hasFailed ? "failed" : "success";

    updateDemoSessionTransactionStatus(transactionId, status);

    return {
      transactionId,
      status,
    };
  },
};
