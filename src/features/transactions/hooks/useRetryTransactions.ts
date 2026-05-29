import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  TRANSACTIONS_QUERY_KEY,
  retryPaymentMutationOptions,
} from "@/api/queries/transactions";
import type { Transaction, TransactionStatus } from "@/lib/data-source/types";

export function useRetryTransactions() {
  const queryClient = useQueryClient();
  const [retryingIds, setRetryingIds] = useState<Set<string>>(() => new Set());
  const { mutateAsync } = useMutation(retryPaymentMutationOptions);

  function updateTransactionStatus(
    transactionId: string,
    status: TransactionStatus,
  ) {
    queryClient.setQueryData(
      TRANSACTIONS_QUERY_KEY,
      (transactions: Transaction[]) =>
        transactions.map((transaction) =>
          transaction.id === transactionId
            ? { ...transaction, status }
            : transaction,
        ),
    );
  }

  function stopRetrying(transactionId: string) {
    setRetryingIds((previous) => {
      const next = new Set(previous);
      next.delete(transactionId);
      return next;
    });
  }

  async function retryTransaction(
    transactionId: string,
  ): Promise<TransactionStatus> {
    setRetryingIds((previous) => new Set(previous).add(transactionId));

    try {
      const result = await mutateAsync(transactionId);
      updateTransactionStatus(transactionId, result.status);
      stopRetrying(transactionId);
      return result.status;
    } catch {
      stopRetrying(transactionId);
      return "failed";
    }
  }

  async function retrySelected(selectedIds: string[]) {
    const statuses = await Promise.all(
      selectedIds.map((transactionId) => retryTransaction(transactionId)),
    );

    const succeeded = statuses.filter((status) => status === "success").length;
    const failed = statuses.length - succeeded;

    toast.info(`Retry complete: ${succeeded} succeeded, ${failed} failed`, {
      duration: 4000,
    });
  }

  return { retryingIds, retrySelected };
}
