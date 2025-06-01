import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1748758545262 implements MigrationInterface {
    name = 'Migration1748758545262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "updated_at" SET DEFAULT '2025-05-31 07:22:07.363703'`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "created_at" SET DEFAULT '2025-05-31 07:22:07.363703'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '2025-05-31 07:22:07.363703'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2025-05-31 07:22:07.363703'`);
    }

}
