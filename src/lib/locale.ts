export const localeConfig = {
  locale: process.env.NEXT_PUBLIC_LOCALE ?? "en-GB",
  timeZone: process.env.NEXT_PUBLIC_TIMEZONE ?? "UTC",
} as const;
