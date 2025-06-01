import { CreateTransactionDTO } from "@application/transactions/dtos/create-transaction.dto";
import {
	ListTransactionDTO,
	TransactionListResponseDTO,
} from "@application/transactions/dtos/list-transactions.dto";
import { TransactionEntity } from "@application/transactions/entities/transaction.entity";
import { TransactionsRepository } from "@application/transactions/repositories/transactions.repository";
import { DatabaseTransactionManager } from "@infra/database/types/transactions.props";

export class TransactionsRepositoryMock implements TransactionsRepository {
	public create(
		data: CreateTransactionDTO,
		transaction: DatabaseTransactionManager,
	): Promise<string> {
		throw new Error("Method not implemented.");
	}

	public findById(
		transactionId: string,
		transaction: DatabaseTransactionManager,
	): Promise<TransactionEntity | null> {
		throw new Error("Method not implemented.");
	}

	public findMany(
		walletId: string,
		query: ListTransactionDTO,
	): Promise<TransactionListResponseDTO> {
		throw new Error("Method not implemented.");
	}

	public updateById(
		id: string,
		data: Partial<Omit<TransactionEntity, "id">>,
		transaction: DatabaseTransactionManager,
	): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
