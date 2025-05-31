import { TransactionsRepository } from "@application/transactions/repositories/transactions.repository";
import { UserEntity } from "@application/users/entities/user.entity";
import { WalletDepositDTO } from "@application/wallets/dtos/wallet-deposit.dto";
import { WalletsRepository } from "@application/wallets/repositories/wallets.repository";

import { Injectable } from "@nestjs/common";

@Injectable()
export class DepositInWalletUseCase {
	constructor(
		private readonly walletsRepository: WalletsRepository,
		private readonly transactionsRepository: TransactionsRepository,
	) {}

	async execute(user: UserEntity, data: WalletDepositDTO): Promise<void> {}
}
