"use client";

import { Suspense } from "react";
import { TransactionsLoadingContent } from "@/components/ui/Skeleton";
import { TransactionsTable } from "./TransactionsTable";

export function TransactionsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Suspense fallback={<TransactionsLoadingContent />}>
        <TransactionsTable />
      </Suspense>
    </main>
  );
}
