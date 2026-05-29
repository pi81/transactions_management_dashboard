import clsx from "clsx";

const SKELETON_ROWS_NUMBER = 8;

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={clsx("animate-pulse rounded bg-gray-800", className)}
      aria-hidden="true"
    />
  );
}

export function TransactionsTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-800">
      <div className="border-b border-gray-800 bg-gray-900 px-6 py-4">
        <Skeleton className="h-5 w-32" />
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            {["w-6", "w-24", "w-28", "w-36", "w-20", "w-28"].map(
              (width, index) => (
                <th key={index} className="px-4 py-3 text-left">
                  <Skeleton className={`h-4 ${width}`} />
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: SKELETON_ROWS_NUMBER }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-800/50">
              <td className="px-4 py-4">
                <Skeleton className="h-4 w-4" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="h-4 w-36" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="h-5 w-16 rounded-full" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="h-8 w-28 rounded-lg" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TransactionsLoadingContent() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-40" />
      <TransactionsTableSkeleton />
    </div>
  );
}

export function TransactionsPageSkeleton() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <TransactionsLoadingContent />
    </main>
  );
}
