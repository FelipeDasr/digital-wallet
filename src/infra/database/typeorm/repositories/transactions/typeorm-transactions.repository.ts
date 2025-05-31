import { TransactionEntity } from "@application/transactions/entities/transaction.entity";

import { TransactionsRepository } from "@application/transactions/repositories/transactions.repository";

import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { TypeORMService } from "../../typeorm.service";

@Injectable()
export class TypeORMTransactionsRepository implements TransactionsRepository {
	private repository: Repository<TransactionEntity>;

	constructor(private readonly db: TypeORMService) {
		this.repository = this.db.getRepository(TransactionEntity);
	}
}
