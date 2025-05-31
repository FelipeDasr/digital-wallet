import { WalletEntity } from "@application/wallets/entities/wallet.entity";

export abstract class WalletsRepository {
	public abstract findByUserId(userId: string): Promise<WalletEntity | null>;
}
