import { DatabaseTransactionManager } from "@infra/database/types/transactions.props";
import { CreateTransactionDTO } from "../dtos/create-transaction.dto";

export abstract class TransactionsRepository {
	public abstract create(
		data: CreateTransactionDTO,
		transaction: DatabaseTransactionManager,
	): Promise<string>;
}
