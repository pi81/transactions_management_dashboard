"use client";

import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { transactionsQueryOptions } from "@/api/queries/transactions";
import { useRetryTransactions } from "../hooks/useRetryTransactions";
import { TransactionRow } from "./TransactionRow";
import { RetryToolbar } from "./RetryToolbar";

export function TransactionsTable() {
  const { data: transactions } = useSuspenseQuery(transactionsQueryOptions);
  const { retryingIds, retrySelected } = useRetryTransactions();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const failedTransactions = transactions.filter(
    (transaction) => transaction.status === "failed",
  );
  const failedTransactionIds = failedTransactions.map(
    (transaction) => transaction.id,
  );
  const isAnyRetrying = retryingIds.size > 0;

  function handleToggleSelect(transactionId: string) {
    setSelectedIds((previous) =>
      previous.includes(transactionId)
        ? previous.filter((id) => id !== transactionId)
        : [...previous, transactionId],
    );
  }

  function handleSelectAllFailed() {
    setSelectedIds(failedTransactionIds);
  }

  function handleClearSelection() {
    setSelectedIds([]);
  }

  async function handleRetrySelected() {
    const idsToRetry = [...selectedIds];
    setSelectedIds([]);
    await retrySelected(idsToRetry);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-100">Transactions</h1>
        {failedTransactions.length > 0 && (
          <button
            onClick={handleSelectAllFailed}
            disabled={isAnyRetrying}
            className="text-sm text-indigo-400 hover:text-indigo-300 disabled:opacity-50 transition-colors"
          >
            Select all failed ({failedTransactions.length})
          </button>
        )}
      </div>

      <RetryToolbar
        selectedCount={selectedIds.length}
        isRetrying={isAnyRetrying}
        onRetrySelected={handleRetrySelected}
        onClearSelection={handleClearSelection}
      />

      <div className="overflow-hidden rounded-xl border border-gray-800">
        <table className="w-full text-left">
          <thead className="border-b border-gray-800 bg-gray-900">
            <tr>
              <th className="w-10 px-4 py-3" aria-label="Select for retry" />
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                Transaction ID
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                Amount
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                Date &amp; Time
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                Status
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                isSelected={selectedIds.includes(transaction.id)}
                isRetrying={retryingIds.has(transaction.id)}
                onToggleSelectAction={handleToggleSelect}
              />
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-right text-xs text-gray-500">
        {transactions.length} transactions
      </p>
    </div>
  );
}
