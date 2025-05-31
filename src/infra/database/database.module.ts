import { TransactionsRepository } from "@application/transactions/repositories/transactions.repository";
import { UsersRepository } from "@application/users/repositories/users.repository";
import { WalletsRepository } from "@application/wallets/repositories/wallets.repository";

import { TypeORMTransactionsRepository } from "./typeorm/repositories/transactions/typeorm-transactions.repository";
import { TypeORMUserRepository } from "./typeorm/repositories/users/typeorm-user.repository";
import { TypeORMWalletsRepository } from "./typeorm/repositories/wallets/typeorm-wallets.repository";

import { Module } from "@nestjs/common";
import { TypeORMService } from "./typeorm/typeorm.service";

@Module({
	providers: [
		TypeORMService,
		{
			provide: UsersRepository,
			useClass: TypeORMUserRepository,
		},
		{
			provide: WalletsRepository,
			useClass: TypeORMWalletsRepository,
		},
		{
			provide: TransactionsRepository,
			useClass: TypeORMTransactionsRepository,
		},
	],
	exports: [UsersRepository, WalletsRepository, TransactionsRepository],
})
export class DatabaseModule {}
