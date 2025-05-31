import { WalletEntity } from "@application/wallets/entities/wallet.entity";
import { DatabaseTransactionManager } from "@infra/database/types/transactions.props";

export abstract class WalletsRepository {
	public abstract findByUserId(userId: string): Promise<WalletEntity | null>;

	public abstract existsById(
		id: string,
		transaction: DatabaseTransactionManager,
	): Promise<boolean>;

	public abstract incrementBalanceById(
		walletId: string,
		amount: number,
		transaction: DatabaseTransactionManager,
	): Promise<void>;

	public abstract getBalance(
		walletId: string,
		transaction: DatabaseTransactionManager,
	): Promise<number>;
}
