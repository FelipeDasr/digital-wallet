import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { env } from "src/env";
import { DataSource } from "typeorm";

@Injectable()
export class TypeORMService
	extends DataSource
	implements OnModuleInit, OnModuleDestroy
{
	constructor() {
		super({
			type: "postgres",
			url: env.DATABASE_URL,
			synchronize: false,
		});
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
