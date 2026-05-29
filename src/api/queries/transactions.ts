import { getRepository } from "@/api/get-repository";

export const TRANSACTIONS_QUERY_KEY = ["transactions"] as const;

const TRANSACTIONS_STALE_TIME_MS = 30_000;

export const transactionsQueryOptions = {
  queryKey: TRANSACTIONS_QUERY_KEY,
  queryFn: () => getRepository().list(),
  staleTime: TRANSACTIONS_STALE_TIME_MS,
};

export const downloadInvoiceMutationOptions = {
  mutationFn: (transactionId: string) =>
    getRepository().downloadInvoice(transactionId),
};

export const retryPaymentMutationOptions = {
  mutationFn: (transactionId: string) =>
    getRepository().retryPayment(transactionId),
};
