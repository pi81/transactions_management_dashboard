export const INVOICE_GENERATION_MS = 2000;
export const RETRY_DELAY_MIN_MS = 1000;
export const RETRY_DELAY_MAX_MS = 4000;
export const RETRY_FAILURE_RATE = 0.2;
export const LIST_LOAD_DELAY_MS = 600;

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const randomDelay = (min: number, max: number): Promise<void> =>
  sleep(min + Math.floor(Math.random() * (max - min + 1)));

export const randomFailure = (rate: number): boolean => Math.random() < rate;
