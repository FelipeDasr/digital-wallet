import { ReallocateWalletBalancesDTO } from "@application/wallets/dtos/reallocate-wallet-balances.dto";
import { WalletsRepository } from "@application/wallets/repositories/wallets.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ReallocateWalletBalancesUseCase {
	constructor(private readonly walletsRepository: WalletsRepository) {}

	public async execute({
		destinationWalletId,
		sourceWalletId,
		amount,
		dbTransaction,
	}: ReallocateWalletBalancesDTO) {
		const valueToDebit = Math.abs(amount) * -1;

		await Promise.all([
			this.walletsRepository.incrementBalanceById(
				sourceWalletId,
				valueToDebit,
				dbTransaction,
			),
			this.walletsRepository.incrementBalanceById(
				destinationWalletId,
				amount,
				dbTransaction,
			),
		]);
	}
}
