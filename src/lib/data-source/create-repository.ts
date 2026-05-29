import { apiTransactionRepository } from "./api/api-repository";
import { demoTransactionRepository } from "./demo/demo-repository";
import type { DataSource, TransactionRepository } from "./types";
import { withValidatedResponses } from "./validate-repository";

const DEFAULT_DATA_SOURCE: DataSource = "demo";

function resolveDataSource(): DataSource {
  const raw = process.env.NEXT_PUBLIC_DATA_SOURCE;
  if (raw === "api") return "api";
  if (raw === "demo") return "demo";
  return DEFAULT_DATA_SOURCE;
}

export function createTransactionRepository(): TransactionRepository {
  const source = resolveDataSource();

  switch (source) {
    case "demo":
      return withValidatedResponses(demoTransactionRepository);
    case "api":
      return withValidatedResponses(apiTransactionRepository);
    default: {
      const _exhaustive: never = source;
      return _exhaustive;
    }
  }
}
