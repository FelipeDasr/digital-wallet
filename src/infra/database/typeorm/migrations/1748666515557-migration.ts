import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1748666515557 implements MigrationInterface {
	name = "Migration1748666515557";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT '"2025-05-31T04:42:02.260Z"', "updated_at" TIMESTAMP NOT NULL DEFAULT '"2025-05-31T04:42:02.260Z"', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "wallets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "balance" integer NOT NULL DEFAULT '0', "user_id" uuid NOT NULL, CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "status" "public"."transactions_status_enum" NOT NULL, "source_wallet_id" uuid NOT NULL, "destination_wallet_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT '"2025-05-31T04:42:02.797Z"', "updated_at" TIMESTAMP NOT NULL DEFAULT '"2025-05-31T04:42:02.798Z"', CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "wallets" ADD CONSTRAINT "FK_92558c08091598f7a4439586cda" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "transactions" ADD CONSTRAINT "FK_c470ca68ff6fa5989ad8caae618" FOREIGN KEY ("source_wallet_id") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "transactions" ADD CONSTRAINT "FK_059f9e66af373d8e3d79e779d93" FOREIGN KEY ("destination_wallet_id") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "transactions" DROP CONSTRAINT "FK_059f9e66af373d8e3d79e779d93"`,
		);
		await queryRunner.query(
			`ALTER TABLE "transactions" DROP CONSTRAINT "FK_c470ca68ff6fa5989ad8caae618"`,
		);
		await queryRunner.query(
			`ALTER TABLE "wallets" DROP CONSTRAINT "FK_92558c08091598f7a4439586cda"`,
		);
		await queryRunner.query(`DROP TABLE "transactions"`);
		await queryRunner.query(`DROP TABLE "wallets"`);
		await queryRunner.query(`DROP TABLE "users"`);
	}
}
