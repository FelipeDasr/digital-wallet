import { TransactionsRepository } from "@application/transactions/repositories/transactions.repository";
import { UsersRepository } from "@application/users/repositories/users.repository";
import { WalletsRepository } from "@application/wallets/repositories/wallets.repository";

import { TypeORMTransactionsRepository } from "./typeorm/repositories/transactions/typeorm-transactions.repository";
import { TypeORMUserRepository } from "./typeorm/repositories/users/typeorm-user.repository";
import { TypeORMWalletsRepository } from "./typeorm/repositories/wallets/typeorm-wallets.repository";

import { Module } from "@nestjs/common";
import { TypeORMTransaction } from "./typeorm/transaction";
import { TypeORMService } from "./typeorm/typeorm.service";
import { DatabaseTransaction } from "./types/transactions.props";

@Module({
	providers: [
		TypeORMService,
		{
			provide: DatabaseTransaction,
			useClass: TypeORMTransaction,
		},
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
	exports: [
		DatabaseTransaction,
		UsersRepository,
		WalletsRepository,
		TransactionsRepository,
	],
})
export class DatabaseModule {}
