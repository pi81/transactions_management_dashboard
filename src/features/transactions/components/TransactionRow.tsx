"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { downloadInvoiceMutationOptions } from "@/api/queries/transactions";
import { Checkbox } from "@/components/ui/Checkbox";
import { Spinner } from "@/components/ui/Spinner";
import type { Transaction } from "@/lib/data-source/types";
import { localeConfig } from "@/lib/locale";
import { DownloadInvoiceButton } from "./DownloadInvoiceButton";
import { TransactionStatusBadge } from "./TransactionStatusBadge";

type TransactionRowProps = {
	transaction: Transaction;
	isSelected: boolean;
	isRetrying: boolean;
	onToggleSelectAction: (transactionId: string) => void;
};

export function TransactionRow({
	transaction,
	isSelected,
	isRetrying,
	onToggleSelectAction,
}: TransactionRowProps) {
	const isFailed = transaction.status === "failed";
	const { mutate: downloadInvoice, isPending: isInvoiceDownloading } =
		useMutation({
			...downloadInvoiceMutationOptions,
			onSuccess: (blob, transactionId) => {
				downloadInvoiceFile(blob, transactionId);
				toast.success("Invoice downloaded", {
					description: `Transaction ${transactionId}`,
				});
			},
			onError: () => {
				toast.error("Failed to download invoice");
			},
		});

	return (
		<tr
			aria-busy={isRetrying}
			className="border-b border-gray-800/50 transition-colors hover:bg-gray-800/20"
		>
			<td className="w-10 px-4 py-4">
				{isRetrying && <Spinner size="sm" />}
				{isFailed && !isRetrying && (
					<Checkbox
						id={`select-${transaction.id}`}
						checked={isSelected}
						onChange={() => onToggleSelectAction(transaction.id)}
						aria-label={`Select transaction ${transaction.id} for retry`}
					/>
				)}
			</td>

			<td className="px-4 py-4">
				<span className="font-mono text-xs text-gray-300">
					{transaction.id}
				</span>
			</td>

			<td className="px-4 py-4">
				<span className="font-medium text-gray-100">
					{formatAmount(
						transaction.amount,
						transaction.currency,
						localeConfig.locale,
					)}
				</span>
			</td>

			<td className="px-4 py-4">
				<span className="text-sm text-gray-400">
					{formatDateTime(
						transaction.createdAt,
						localeConfig.locale,
						localeConfig.timeZone,
					)}
				</span>
			</td>

			<td className="px-4 py-4">
				<TransactionStatusBadge status={transaction.status} />
			</td>

			<td className="px-4 py-4">
				<DownloadInvoiceButton
					transactionId={transaction.id}
					isDownloading={isInvoiceDownloading}
					onDownload={downloadInvoice}
				/>
			</td>
		</tr>
	);
}

function formatAmount(
	amount: number,
	currency: string,
	locale: string,
): string {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
	}).format(amount);
}

function formatDateTime(
	isoString: string,
	locale: string,
	timeZone: string,
): string {
	return new Intl.DateTimeFormat(locale, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone,
	}).format(new Date(isoString));
}

function downloadInvoiceFile(blob: Blob, transactionId: string) {
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement("a");

	anchor.href = url;
	anchor.download = `invoice-${transactionId}.pdf`;
	document.body.appendChild(anchor);
	anchor.click();
	document.body.removeChild(anchor);
	URL.revokeObjectURL(url);
}
