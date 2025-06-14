import { TransactionsRepository } from "@application/transactions/repositories/transactions.repository";
import { WalletsRepository } from "@application/wallets/repositories/wallets.repository";

import { TransactionIdDTO } from "@application/transactions/dtos/transaction-id.dto";
import { WalletTransferDTO } from "@application/transactions/dtos/wallet-transfer";
import { UserEntity } from "@application/users/entities/user.entity";

import { CheckWalletBalanceUseCase } from "@application/wallets/use-cases/check-wallet-balance/check-wallet-balance.use-case";
import { ReallocateWalletBalancesUseCase } from "@application/wallets/use-cases/reallocate-wallet-balances/reallocate-wallet-balances.use-case";

import {
	TransactionStatus,
	TransactionType,
} from "@application/transactions/entities/transaction.entity";
import {
	DatabaseTransaction,
	DatabaseTransactionManager,
} from "@infra/database/types/transactions.props";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class TransferToWalletUseCase {
	constructor(
		private readonly transactionsRepository: TransactionsRepository,
		private readonly walletsRepository: WalletsRepository,
		private readonly databaseTransaction: DatabaseTransaction,
		private readonly checkWalletBalanceUseCase: CheckWalletBalanceUseCase,
		private readonly reallocateWalletBalancesUseCase: ReallocateWalletBalancesUseCase,
	) {}

	public async execute(
		user: UserEntity,
		{ amount, destinationWalletId }: WalletTransferDTO,
	): Promise<TransactionIdDTO> {
		return await this.databaseTransaction.start(async (transaction) => {
			const sourceWalletId = user.wallets[0].id;
			const newDebitValue = amount * -1;

			await this.checkWalletBalanceUseCase.execute(
				sourceWalletId,
				amount,
				transaction,
			);

			await this.checkDestinationWallet(destinationWalletId, transaction);

			const [_, transactionId] = await Promise.all([
				this.reallocateWalletBalancesUseCase.execute({
					sourceWalletId,
					destinationWalletId,
					amount,
					dbTransaction: transaction,
				}),
				this.transactionsRepository.create(
					{
						status: TransactionStatus.COMPLETED,
						type: TransactionType.TRANSFER,
						sourceWalletId: sourceWalletId,
						destinationWalletId: destinationWalletId,
						amount,
					},
					transaction,
				),
			]);

			return {
				transactionId,
			};
		});
	}

	private async checkDestinationWallet(
		destinationWalletId: string,
		transaction: DatabaseTransactionManager,
	) {
		const destinationWalletExists = await this.walletsRepository.existsById(
			destinationWalletId,
			transaction,
		);

		if (!destinationWalletExists) {
			throw new NotFoundException("Destination wallet does not exist");
		}
	}
}
