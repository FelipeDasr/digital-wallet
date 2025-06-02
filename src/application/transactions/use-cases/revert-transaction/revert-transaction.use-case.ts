import { TransactionsRepository } from "@application/transactions/repositories/transactions.repository";

import { UserEntity } from "@application/users/entities/user.entity";

import { CheckWalletBalanceUseCase } from "@application/wallets/use-cases/check-wallet-balance/check-wallet-balance.use-case";
import { ReallocateWalletBalancesUseCase } from "@application/wallets/use-cases/reallocate-wallet-balances/reallocate-wallet-balances.use-case";

import {
	TransactionEntity,
	TransactionStatus,
	TransactionType,
} from "@application/transactions/entities/transaction.entity";
import {
	DatabaseTransaction,
	DatabaseTransactionManager,
} from "@infra/database/types/transactions.props";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class RevertTransactionUseCase {
	constructor(
		private readonly transactionsRepository: TransactionsRepository,
		private readonly databaseTransaction: DatabaseTransaction,
		private readonly checkWalletBalanceUseCase: CheckWalletBalanceUseCase,
		private readonly reallocateWalletBalancesUseCase: ReallocateWalletBalancesUseCase,
	) {}

	public async execute(user: UserEntity, transactionId: string) {
		await this.databaseTransaction.start(async (dbTransaction) => {
			const userWalletId = user.wallets[0].id;

			const transaction = await this.verifyAndGetTransactionData(
				transactionId,
				dbTransaction,
			);

			const { sourceWalletId, destinationWalletId, amount } = transaction;

			await this.verifyWalletsOwnership(userWalletId, transaction);
			await this.checkWalletBalanceUseCase.execute(
				destinationWalletId as string,
				amount,
				dbTransaction,
			);

			await Promise.all([
				this.reallocateWalletBalancesUseCase.execute({
					sourceWalletId: destinationWalletId as string,
					destinationWalletId: sourceWalletId as string,
					amount,
					dbTransaction,
				}),
				this.transactionsRepository.updateById(
					transactionId,
					{ status: TransactionStatus.REFUNDED },
					dbTransaction,
				),
			]);
		});
	}

	public async verifyAndGetTransactionData(
		transactionId: string,
		dbTransaction: DatabaseTransactionManager,
	) {
		const transactionData = await this.transactionsRepository.findById(
			transactionId,
			dbTransaction,
		);

		if (!transactionData) {
			throw new BadRequestException("Transaction not found");
		}

		if (transactionData.status === TransactionStatus.REFUNDED) {
			throw new BadRequestException("Transaction already refunded");
		}

		if (transactionData.type === TransactionType.DEPOSIT) {
			throw new BadRequestException("Cannot revert deposit transactions");
		}

		return transactionData;
	}

	public async verifyWalletsOwnership(
		userWalletId: string,
		transaction: TransactionEntity,
	) {
		if (
			transaction.sourceWalletId === userWalletId ||
			transaction.destinationWalletId === userWalletId
		) {
			return;
		}

		throw new BadRequestException("You do not own this transaction's wallets");
	}
}
