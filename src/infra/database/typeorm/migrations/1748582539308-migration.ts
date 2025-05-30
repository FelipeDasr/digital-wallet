import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1748582539308 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "wallets" (
        "id" UUID PRIMARY KEY NOT NULL,
        "balance" INTEGER NOT NULL DEFAULT 0,
        "user_id" TEXT NOT NULL,
        FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
      );

      CREATE TYPE transaction_status AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

      CREATE TABLE transactions (
        id UUID PRIMARY KEY,
        amount INTEGER NOT NULL,
        status transaction_status NOT NULL,
        source_wallet_id INTEGER NOT NULL,
        destination_wallet_id INTEGER NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY ("source_wallet_id") REFERENCES "wallets" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
        FOREIGN KEY ("destination_wallet_id") REFERENCES "wallets" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
      );
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(`
      DROP TABLE IF EXISTS "wallets";
      DROP TABLE IF EXISTS "transactions";
      DROP TYPE IF EXISTS transaction_status;
    `);
	}
}
