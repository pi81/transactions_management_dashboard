import { createTransactionRepository } from "@/lib/data-source/create-repository";
import type { TransactionRepository } from "@/lib/data-source/types";

let repository: TransactionRepository | null = null;

export function getRepository(): TransactionRepository {
  if (!repository) {
    repository = createTransactionRepository();
  }
  return repository;
}
