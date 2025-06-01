import { TransactionListItemDTO } from "@application/transactions/dtos/list-transactions.dto";

export function mapTransactionList(
	// biome-ignore lint/suspicious/noExplicitAny: raw data
	transactions: any[],
): TransactionListItemDTO[] {
	return transactions.map(
		// biome-ignore lint/suspicious/noExplicitAny: raw data
		(transaction: any) =>
			({
				id: transaction.transactions_id,
				type: transaction.transactions_type,
				status: transaction.transactions_status,
				amount: transaction.transactions_amount,
				sourceWallet: transaction.sourcewallet.id
					? transaction.sourcewallet
					: null,
				destinationWallet: transaction.destinationwallet,
				createdAt: transaction.transactions_created_at,
				updatedAt: transaction.transactions_updated_at,
			}) as TransactionListItemDTO,
	);
}
