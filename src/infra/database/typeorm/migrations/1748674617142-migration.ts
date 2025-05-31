import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1748674617142 implements MigrationInterface {
	name = "Migration1748674617142";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "public"."transactions_type_enum" AS ENUM('TRANSFER', 'DEPOSIT')`,
		);
		await queryRunner.query(
			`ALTER TABLE "transactions" ADD "type" "public"."transactions_type_enum" NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT 'NOW()'`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT 'NOW()'`,
		);
		await queryRunner.query(
			`ALTER TABLE "transactions" ALTER COLUMN "created_at" SET DEFAULT 'NOW()'`,
		);
		await queryRunner.query(
			`ALTER TABLE "transactions" ALTER COLUMN "updated_at" SET DEFAULT 'NOW()'`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "transactions" ALTER COLUMN "updated_at" SET DEFAULT '2025-05-31 06:49:49.744'`,
		);
		await queryRunner.query(
			`ALTER TABLE "transactions" ALTER COLUMN "created_at" SET DEFAULT '2025-05-31 06:49:49.744'`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '2025-05-31 06:49:49.254'`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2025-05-31 06:49:49.254'`,
		);
		await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "type"`);
		await queryRunner.query(`DROP TYPE "public"."transactions_type_enum"`);
	}
}
