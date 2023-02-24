import { MigrationInterface, QueryRunner } from "typeorm";

export class schemaSync1677233464195 implements MigrationInterface {
    name = 'schemaSync1677233464195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cineplex_entity" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cineplex_entity" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cinema_entity" DROP CONSTRAINT "FK_49bcb15fe601ed3a4fa9b96497d"`);
        await queryRunner.query(`ALTER TABLE "cineplex_entity" DROP CONSTRAINT "PK_f872d57bc555a741c4e7dc8ce75"`);
        await queryRunner.query(`ALTER TABLE "cineplex_entity" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "cineplex_entity" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "cineplex_entity" ADD CONSTRAINT "PK_f872d57bc555a741c4e7dc8ce75" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "cinema_entity" DROP COLUMN "cineplex_id"`);
        await queryRunner.query(`ALTER TABLE "cinema_entity" ADD "cineplex_id" uuid`);
        await queryRunner.query(`ALTER TABLE "cinema_entity" ADD CONSTRAINT "FK_49bcb15fe601ed3a4fa9b96497d" FOREIGN KEY ("cineplex_id") REFERENCES "cineplex_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cinema_entity" DROP CONSTRAINT "FK_49bcb15fe601ed3a4fa9b96497d"`);
        await queryRunner.query(`ALTER TABLE "cinema_entity" DROP COLUMN "cineplex_id"`);
        await queryRunner.query(`ALTER TABLE "cinema_entity" ADD "cineplex_id" integer`);
        await queryRunner.query(`ALTER TABLE "cineplex_entity" DROP CONSTRAINT "PK_f872d57bc555a741c4e7dc8ce75"`);
        await queryRunner.query(`ALTER TABLE "cineplex_entity" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "cineplex_entity" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cineplex_entity" ADD CONSTRAINT "PK_f872d57bc555a741c4e7dc8ce75" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "cinema_entity" ADD CONSTRAINT "FK_49bcb15fe601ed3a4fa9b96497d" FOREIGN KEY ("cineplex_id") REFERENCES "cineplex_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cineplex_entity" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "cineplex_entity" DROP COLUMN "created_at"`);
    }

}
