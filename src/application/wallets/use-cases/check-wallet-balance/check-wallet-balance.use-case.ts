import { WalletsRepository } from "@application/wallets/repositories/wallets.repository";
import { DatabaseTransactionManager } from "@infra/database/types/transactions.props";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class CheckWalletBalanceUseCase {
	constructor(private readonly walletsRepository: WalletsRepository) {}

	public async execute(
		walletId: string,
		amount: number,
		transaction: DatabaseTransactionManager,
	): Promise<void> {
		const sourceWalletBalance = await this.walletsRepository.getBalance(
			walletId,
			transaction,
		);

		if (sourceWalletBalance < amount) {
			throw new BadRequestException("Insufficient balance in wallet");
		}
	}
}
