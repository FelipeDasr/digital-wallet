import { DatabaseTransactionManager } from "@infra/database/types/transactions.props";
import { CreateTransactionDTO } from "../dtos/create-transaction.dto";
import { TransactionEntity } from "../entities/transaction.entity";

export abstract class TransactionsRepository {
	public abstract create(
		data: CreateTransactionDTO,
		transaction: DatabaseTransactionManager,
	): Promise<string>;

	public abstract findById(
		transactionId: string,
		transaction: DatabaseTransactionManager,
	): Promise<TransactionEntity | null>;

	public abstract updateById(
		id: string,
		data: Partial<Omit<TransactionEntity, "id">>,
		transaction: DatabaseTransactionManager,
	): Promise<void>;
}
