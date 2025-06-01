import { ListTransactionDTO } from "@application/transactions/dtos/list-transactions.dto";
import { TransactionsRepository } from "@application/transactions/repositories/transactions.repository";
import { UserEntity } from "@application/users/entities/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListTransfersUseCase {
	constructor(
		private readonly transactionsRepository: TransactionsRepository,
	) {}

	public async execute(user: UserEntity, query: ListTransactionDTO) {
		const walletId = user.wallets[0].id;

		return await this.transactionsRepository.findMany(walletId, query);
	}
}
