import { TransactionsRepository } from "@application/transactions/repositories/transactions.repository";
import { WalletsRepository } from "@application/wallets/repositories/wallets.repository";

import { WalletTransferDTO } from "@application/transactions/dtos/wallet-transfer";
import { UserEntity } from "@application/users/entities/user.entity";

import {
	TransactionStatus,
	TransactionType,
} from "@application/transactions/entities/transaction.entity";
import {
	DatabaseTransaction,
	DatabaseTransactionManager,
} from "@infra/database/types/transactions.props";
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";

@Injectable()
export class TransferToWalletUseCase {
	constructor(
		private readonly transactionsRepository: TransactionsRepository,
		private readonly walletsRepository: WalletsRepository,
		private readonly databaseTransaction: DatabaseTransaction,
	) {}

	public async execute(
		user: UserEntity,
		{ amount, destinationWalletId }: WalletTransferDTO,
	) {
		await this.databaseTransaction.start(async (transaction) => {
			const sourceWalletId = user.wallets[0].id;
			const valueToDebit = amount * -1;

			await this.checkSufficientBalance(sourceWalletId, amount, transaction);
			await this.checkDestinationWallet(destinationWalletId, transaction);

			await Promise.all([
				this.walletsRepository.incrementBalanceById(
					sourceWalletId,
					valueToDebit,
					transaction,
				),
				this.walletsRepository.incrementBalanceById(
					destinationWalletId,
					amount,
					transaction,
				),
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
		});
	}

	private async checkSufficientBalance(
		walletId: string,
		amount: number,
		transaction: DatabaseTransactionManager,
	) {
		const sourceWalletBalance = await this.walletsRepository.getBalance(
			walletId,
			transaction,
		);

		if (sourceWalletBalance < amount) {
			throw new BadRequestException("Insufficient balance in wallet");
		}
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
