import { TransactionEntity } from "@application/transactions/entities/transaction.entity";

import { TransactionsRepository } from "@application/transactions/repositories/transactions.repository";

import { CreateTransactionDTO } from "@application/transactions/dtos/create-transaction.dto";
import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";
import { TypeORMService } from "../../typeorm.service";

@Injectable()
export class TypeORMTransactionsRepository implements TransactionsRepository {
	private repository: Repository<TransactionEntity>;

	constructor(private readonly db: TypeORMService) {
		this.repository = this.db.getRepository(TransactionEntity);
	}

	public async create(
		data: CreateTransactionDTO,
		transaction: EntityManager,
	): Promise<string> {
		const newTransactions = await transaction
			.getRepository(TransactionEntity)
			.save(data);

		return newTransactions.id;
	}
}
