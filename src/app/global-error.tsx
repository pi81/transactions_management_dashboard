"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="bg-slate-900 min-h-screen flex items-center justify-center p-6">
        <main className="w-full flex items-center justify-center">
          <section className="max-w-md w-full rounded-2xl border border-red-900 bg-slate-800/60 p-8 text-center">
            <h1 className="text-2xl font-semibold text-white mb-3">
              Something went wrong
            </h1>
            <p className="text-sm text-slate-300 mb-6">
              {error?.message ??
                "The application encountered an unexpected error."}
            </p>
            <button
              type="button"
              onClick={reset}
              className="mx-auto inline-flex cursor-pointer items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
            >
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
