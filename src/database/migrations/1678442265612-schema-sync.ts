import { MigrationInterface, QueryRunner } from "typeorm";

export class schemaSync1678442265612 implements MigrationInterface {
    name = 'schemaSync1678442265612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cineplex" ALTER COLUMN "logo" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cineplex" ALTER COLUMN "logo" DROP NOT NULL`);
    }

}
