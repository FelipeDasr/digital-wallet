import { CreateUserDTO } from "@application/users/dtos/create-user.dto";

import {
	UserEntity,
	UserEntityWithoutPassword,
} from "@application/users/entities/user.entity";
import { WalletEntity } from "@application/wallets/entities/wallet.entity";

import { UsersRepository } from "@application/users/repositories/users.repository";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { TypeORMService } from "../../typeorm.service";

@Injectable()
export class TypeORMUserRepository implements UsersRepository {
	private repository: Repository<UserEntity>;

	constructor(private readonly db: TypeORMService) {
		this.repository = this.db.getRepository(UserEntity);
	}

	public async create({
		initialBalance,
		...user
	}: CreateUserDTO): Promise<UserEntityWithoutPassword> {
		return await this.db.manager.transaction(
			async (transactionalEntityManager) => {
				const newUser = await transactionalEntityManager.save(
					new UserEntity(user),
				);

				newUser.wallets = [
					await transactionalEntityManager.save(
						new WalletEntity({
							user_id: newUser.id,
							balance: initialBalance,
						}),
					),
				];

				return {
					...newUser,
					password: undefined,
				} as UserEntityWithoutPassword;
			},
		);
	}

	public async findById(id: string): Promise<UserEntity | null> {
		return await this.repository.findOneBy({ id });
	}

	public async findByEmail(email: string): Promise<UserEntity | null> {
		return await this.repository.findOneBy({ email });
	}
}
