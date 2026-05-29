"use client";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function TransactionsError({ error, reset }: ErrorPageProps) {
  const { reset: resetQueries } = useQueryErrorResetBoundary();

  function handleRetry() {
    resetQueries();
    reset();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col items-center justify-center rounded-xl border border-red-800 bg-red-950/30 px-6 py-16 text-center">
        <div className="mb-4 rounded-full bg-red-500/10 p-4">
          <svg
            className="h-8 w-8 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-semibold text-red-300">
          Failed to load transactions
        </h2>
        <p className="mb-6 max-w-md text-sm text-gray-400">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          type="button"
          onClick={handleRetry}
          className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
