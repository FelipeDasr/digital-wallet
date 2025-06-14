import { TransactionEntity } from "@application/transactions/entities/transaction.entity";
import { UserEntity } from "@application/users/entities/user.entity";
import { WalletEntity } from "@application/wallets/entities/wallet.entity";

import { env } from "src/env";

import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { DataSource, DataSourceOptions } from "typeorm";

@Injectable()
export class TypeORMService
	extends DataSource
	implements OnModuleInit, OnModuleDestroy
{
	constructor() {
		super(typeORMDataSource);
	}

	async onModuleInit() {
		try {
			await this.initialize();
			return console.info("\nDatabase connected\n");
		} catch (error) {
			console.error(`\nError connecting to database: ${error.message}\n`);

			process.exit(1);
		}
	}

	async onModuleDestroy() {
		try {
			await this.destroy();
		} catch (error) {
			console.error(`\nError disconnecting from database: ${error.message}\n`);
		}
	}
}

export const typeORMDataSource: DataSourceOptions = {
	type: "postgres",
	url: env.DATABASE_URL,
	synchronize: false,
	entities: [UserEntity, WalletEntity, TransactionEntity],
};
