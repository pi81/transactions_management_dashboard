import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

type RetryToolbarProps = {
  selectedCount: number;
  isRetrying: boolean;
  onRetrySelected: () => void;
  onClearSelection: () => void;
};

export function RetryToolbar({
  selectedCount,
  isRetrying,
  onRetrySelected,
  onClearSelection,
}: RetryToolbarProps) {
  const hasSelection = selectedCount > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          variant="danger"
          disabled={!hasSelection || isRetrying}
          onClick={onRetrySelected}
          aria-busy={isRetrying}
        >
          {isRetrying && (
            <Spinner size="sm" className="border-current" aria-hidden="true" />
          )}
          Retry Selected
          {hasSelection && !isRetrying && (
            <span className="ml-1 rounded-full bg-red-500/30 px-1.5 py-0.5 text-xs">
              {selectedCount}
            </span>
          )}
        </Button>

        {hasSelection && !isRetrying && (
          <button
            onClick={onClearSelection}
            className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            Clear selection
          </button>
        )}
      </div>
    </div>
  );
}
