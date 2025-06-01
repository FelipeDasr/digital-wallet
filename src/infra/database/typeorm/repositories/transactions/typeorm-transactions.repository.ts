import { TransactionEntity } from "@application/transactions/entities/transaction.entity";

import { TransactionsRepository } from "@application/transactions/repositories/transactions.repository";

import { CreateTransactionDTO } from "@application/transactions/dtos/create-transaction.dto";
import {
	ListTransactionDTO,
	TransactionListResponseDTO,
} from "@application/transactions/dtos/list-transactions.dto";
import { UserEntity } from "@application/users/entities/user.entity";
import { WalletEntity } from "@application/wallets/entities/wallet.entity";
import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";
import { mapTransactionList } from "../../mappers/transaction.mapper";
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

	public async findById(
		id: string,
		transaction: EntityManager,
	): Promise<TransactionEntity | null> {
		return await transaction.getRepository(TransactionEntity).findOneBy({ id });
	}

	public async findMany(
		walletId: string,
		query: ListTransactionDTO,
	): Promise<TransactionListResponseDTO> {
		const { page, limit } = query;

		const commonQuery = this.db
			.createQueryBuilder()
			.from(TransactionEntity, "transactions")
			.where(
				"transactions.sourceWalletId = :walletId OR transactions.destinationWalletId = :walletId",
				{ walletId },
			);

		const [total, transactions] = await Promise.all([
			commonQuery.getCount(),
			commonQuery
				.select([
					"transactions.id",
					"transactions.type",
					"transactions.status",
					"transactions.amount",
					"transactions.created_at",
					"transactions.updated_at",
					`
            JSON_BUILD_OBJECT(
              'id', "sourceWallet".id,
              'owner', JSON_BUILD_OBJECT(
                'id', "sourceUser".id,
                'fullname', "sourceUser".fullname
              )
            ) AS sourceWallet
          `,
					`
            JSON_BUILD_OBJECT(
              'id', "destinationWallet".id,
              'owner', JSON_BUILD_OBJECT(
                'id', "destinationUser".id,
                'fullname', "destinationUser".fullname
              )
            ) AS destinationWallet
          `,
				])
				.leftJoin(
					WalletEntity,
					"sourceWallet",
					"sourceWallet.id = transactions.sourceWalletId",
				)
				.leftJoin(
					UserEntity,
					"sourceUser",
					"sourceUser.id = sourceWallet.user_id",
				)
				.leftJoin(
					WalletEntity,
					"destinationWallet",
					"destinationWallet.id = transactions.destinationWalletId",
				)
				.leftJoin(
					UserEntity,
					"destinationUser",
					"destinationUser.id = destinationWallet.user_id",
				)
				.orderBy('"transactions".created_at', "DESC")
				.offset((page - 1) * limit)
				.limit(limit)
				.execute(),
		]);

		return {
			total,
			data: mapTransactionList(transactions),
		};
	}

	public async updateById(
		id: string,
		data: Partial<Omit<TransactionEntity, "id">>,
		transaction: EntityManager,
	): Promise<void> {
		await transaction.getRepository(TransactionEntity).update(id, {
			...data,
			updatedAt: new Date(),
		});
	}
}
