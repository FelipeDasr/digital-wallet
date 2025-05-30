import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1748567184735 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "users" (
          id UUID PRIMARY KEY NOT NULL,
          fullname TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(`
      DROP TABLE IF EXISTS "users"
    `);
	}
}
