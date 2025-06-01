import { WalletEntity } from "@application/wallets/entities/wallet.entity";
import { WalletsRepository } from "@application/wallets/repositories/wallets.repository";
import { DatabaseTransactionManager } from "@infra/database/types/transactions.props";

export class WalletsRepositoryMock implements WalletsRepository {
	public findByUserId(userId: string): Promise<WalletEntity | null> {
		throw new Error("Method not implemented.");
	}

	public existsById(
		id: string,
		transaction: DatabaseTransactionManager,
	): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	public incrementBalanceById(
		walletId: string,
		amount: number,
		transaction: DatabaseTransactionManager,
	): Promise<void> {
		throw new Error("Method not implemented.");
	}

	public getBalance(
		walletId: string,
		transaction: DatabaseTransactionManager,
	): Promise<number> {
		throw new Error("Method not implemented.");
	}
}
