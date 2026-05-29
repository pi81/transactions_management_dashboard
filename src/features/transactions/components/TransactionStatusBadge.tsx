import { Badge } from "@/components/ui/Badge";
import type { TransactionStatus } from "@/lib/data-source/types";

type TransactionStatusBadgeProps = {
  status: TransactionStatus;
};

const STATUS_LABELS: Record<TransactionStatus, string> = {
  success: "Success",
  failed: "Failed",
  pending: "Pending",
};

export function TransactionStatusBadge({
  status,
}: TransactionStatusBadgeProps) {
  return <Badge variant={status}>{STATUS_LABELS[status]}</Badge>;
}
