import { WalletEntity } from "@application/wallets/entities/wallet.entity";
import { DatabaseTransactionManager } from "@infra/database/types/transactions.props";

export abstract class WalletsRepository {
	public abstract findByUserId(userId: string): Promise<WalletEntity | null>;

	public abstract incrementBalanceById(
		walletId: string,
		amount: number,
		transaction: DatabaseTransactionManager,
	): Promise<void>;
}
