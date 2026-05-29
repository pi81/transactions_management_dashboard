import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

type DownloadInvoiceButtonProps = {
  transactionId: string;
  isDownloading: boolean;
  onDownload: (transactionId: string) => void;
};

export function DownloadInvoiceButton({
  transactionId,
  isDownloading,
  onDownload,
}: DownloadInvoiceButtonProps) {
  return (
    <Button
      variant="secondary"
      disabled={isDownloading}
      onClick={() => onDownload(transactionId)}
      aria-busy={isDownloading}
    >
      {isDownloading && (
        <Spinner size="sm" className="border-current" aria-hidden="true" />
      )}
      {isDownloading ? "Generating…" : "Download invoice"}
    </Button>
  );
}
