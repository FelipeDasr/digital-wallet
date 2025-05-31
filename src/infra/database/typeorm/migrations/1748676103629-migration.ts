import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1748676103629 implements MigrationInterface {
    name = 'Migration1748676103629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_c470ca68ff6fa5989ad8caae618"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_059f9e66af373d8e3d79e779d93"`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "source_wallet_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "destination_wallet_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "created_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "updated_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_c470ca68ff6fa5989ad8caae618" FOREIGN KEY ("source_wallet_id") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_059f9e66af373d8e3d79e779d93" FOREIGN KEY ("destination_wallet_id") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_059f9e66af373d8e3d79e779d93"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_c470ca68ff6fa5989ad8caae618"`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "updated_at" SET DEFAULT '2025-05-31 06:57:19.066555'`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "created_at" SET DEFAULT '2025-05-31 06:57:19.066555'`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "destination_wallet_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "source_wallet_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_059f9e66af373d8e3d79e779d93" FOREIGN KEY ("destination_wallet_id") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_c470ca68ff6fa5989ad8caae618" FOREIGN KEY ("source_wallet_id") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '2025-05-31 06:57:19.066555'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2025-05-31 06:57:19.066555'`);
    }

}
