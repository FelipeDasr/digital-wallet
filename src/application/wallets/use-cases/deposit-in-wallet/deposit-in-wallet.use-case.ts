import {
	TransactionStatus,
	TransactionType,
} from "@application/transactions/entities/transaction.entity";
import { TransactionsRepository } from "@application/transactions/repositories/transactions.repository";
import { UserEntity } from "@application/users/entities/user.entity";
import { WalletDepositDTO } from "@application/wallets/dtos/wallet-deposit.dto";
import { WalletsRepository } from "@application/wallets/repositories/wallets.repository";
import { DatabaseTransaction } from "@infra/database/types/transactions.props";

import { Injectable } from "@nestjs/common";

@Injectable()
export class DepositInWalletUseCase {
	constructor(
		private readonly walletsRepository: WalletsRepository,
		private readonly transactionsRepository: TransactionsRepository,
		private readonly databaseTransaction: DatabaseTransaction,
	) {}

	async execute(user: UserEntity, { amount }: WalletDepositDTO): Promise<void> {
		const walletId = user.wallets?.[0]?.id as string;

		await this.databaseTransaction.start(async (transaction) => {
			await Promise.all([
				this.walletsRepository.incrementBalanceById(
					walletId,
					amount,
					transaction,
				),
				this.transactionsRepository.create(
					{
						status: TransactionStatus.COMPLETED,
						type: TransactionType.DEPOSIT,
						destinationWalletId: walletId,
						sourceWalletId: null,
						amount,
					},
					transaction,
				),
			]);
		});
	}
}
