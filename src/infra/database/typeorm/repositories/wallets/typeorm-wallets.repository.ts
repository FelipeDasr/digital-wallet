import { WalletEntity } from "@application/wallets/entities/wallet.entity";

import { WalletsRepository } from "@application/wallets/repositories/wallets.repository";

import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";
import { TypeORMService } from "../../typeorm.service";

@Injectable()
export class TypeORMWalletsRepository implements WalletsRepository {
	private repository: Repository<WalletEntity>;

	constructor(private readonly db: TypeORMService) {
		this.repository = this.db.getRepository(WalletEntity);
	}

	public async findByUserId(userId: string): Promise<WalletEntity | null> {
		return await this.repository.findOneBy({ user_id: userId });
	}

	public async existsById(
		id: string,
		transaction: EntityManager,
	): Promise<boolean> {
		const wallet = await transaction
			.getRepository(WalletEntity)
			.findOneBy({ id });

		return !!wallet;
	}

	public async incrementBalanceById(
		id: string,
		amount: number,
		transaction: EntityManager,
	): Promise<void> {
		await transaction
			.getRepository(WalletEntity)
			.createQueryBuilder()
			.setLock("pessimistic_write")
			.where("id = :id", { id })
			.update()
			.set({ balance: () => `balance + ${amount}` })
			.execute();
	}

	public async getBalance(
		id: string,
		transaction: EntityManager,
	): Promise<number> {
		const wallet = await transaction
			.getRepository(WalletEntity)
			.findOneBy({ id });

		if (!wallet) {
			return 0;
		}

		return wallet.balance;
	}
}
