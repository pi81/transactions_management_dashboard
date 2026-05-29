# Transactions Management Dashboard

A small subscription management dashboard built with Next.js. Users can review their transaction history, download mock invoices, and retry failed payments in bulk.

## Tech Stack

- Next.js 16 with App Router and React Compiler enabled
- React 19
- TypeScript in strict mode
- Tailwind CSS 4
- TanStack Query for client-side data fetching and mutations
- Zod for repository boundary validation
- Sonner for toast notifications

## Environment

The demo data source is required for the mock assignment flow. Create a local environment file:

```bash
cp .env.example .env.local
```

Use this value in `.env.local`:

```env
NEXT_PUBLIC_DATA_SOURCE=demo
```

`NEXT_PUBLIC_DATA_SOURCE=api` is only a placeholder for a future backend and currently throws a clear "not implemented" error.

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to `/transactions`.

## Available Scripts

```bash
npm run dev        # Start the development server
npm run build      # Create a production build
npm run start      # Start the production server
npm run typecheck  # Run TypeScript checks
npm run lint       # Run ESLint
npm run format     # Format source files with Prettier
```

## Features

- Transaction history table with transaction ID, amount, date, time, and status.
- Mock invoice download with a 2-second generation delay and a success notification.
- Failed transaction selection with checkboxes.
- Bulk retry for selected failed payments.
- Concurrent retry simulation with independent per-row loading states.
- Random retry delay between 1 and 4 seconds with an 80% success rate.
- Route-level and global error fallbacks.
