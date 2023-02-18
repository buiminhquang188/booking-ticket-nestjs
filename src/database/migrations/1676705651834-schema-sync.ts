import { MigrationInterface, QueryRunner } from "typeorm";

export class schemaSync1676705651834 implements MigrationInterface {
    name = 'schemaSync1676705651834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cineplex_entity" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "logo" character varying(50) NOT NULL, CONSTRAINT "PK_f872d57bc555a741c4e7dc8ce75" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "seat_entity" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "status" boolean NOT NULL, "price" smallint NOT NULL, "type" character(6) NOT NULL, "show_time_id" integer, CONSTRAINT "PK_a04f911e7167a46642eb700322e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "show_time_entity" ("id" SERIAL NOT NULL, "start_time" date NOT NULL, "cinema_id" integer, CONSTRAINT "PK_3ef068cc35ec6c82f566e94aa08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cinema_entity" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "address" character varying(50) NOT NULL, "image" character varying(50) NOT NULL, "cineplex_id" integer, CONSTRAINT "PK_e54fbff54021bf920ec708d6ddb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cinema_movie_entity" ("id" SERIAL NOT NULL, "cinema_id" integer, "movie_id" integer, CONSTRAINT "PK_82b7c4433cc83e7183e5646da70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_entity" ("id" SERIAL NOT NULL, "movie_name" character varying(50) NOT NULL, "start_date" date NOT NULL, "time" integer NOT NULL, "evaluate" integer NOT NULL, "poster" character varying(50) NOT NULL, "trailer" character varying(50) NOT NULL, CONSTRAINT "PK_9a7f80ec733baad243af6ba1f80" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket_entity" ("id" SERIAL NOT NULL, "user_id" uuid, "movie_id" integer, CONSTRAINT "PK_4c23bb38e4d566808a73a5af6ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "seat_entity" ADD CONSTRAINT "FK_b24759dcff8fb69d8e730d3d1cf" FOREIGN KEY ("show_time_id") REFERENCES "show_time_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "show_time_entity" ADD CONSTRAINT "FK_31a3ad78b494065c7e643e4ff03" FOREIGN KEY ("cinema_id") REFERENCES "cinema_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cinema_entity" ADD CONSTRAINT "FK_49bcb15fe601ed3a4fa9b96497d" FOREIGN KEY ("cineplex_id") REFERENCES "cineplex_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cinema_movie_entity" ADD CONSTRAINT "FK_af4681771d912a42de772c3cf37" FOREIGN KEY ("cinema_id") REFERENCES "cinema_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cinema_movie_entity" ADD CONSTRAINT "FK_282912dbbfa1ed3e475cad08460" FOREIGN KEY ("movie_id") REFERENCES "movie_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_entity" ADD CONSTRAINT "FK_6898d509e2b9f8c82c994ab79aa" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_entity" ADD CONSTRAINT "FK_cafdbe746ed71fa2b6c4fbdc674" FOREIGN KEY ("movie_id") REFERENCES "movie_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_entity" DROP CONSTRAINT "FK_cafdbe746ed71fa2b6c4fbdc674"`);
        await queryRunner.query(`ALTER TABLE "ticket_entity" DROP CONSTRAINT "FK_6898d509e2b9f8c82c994ab79aa"`);
        await queryRunner.query(`ALTER TABLE "cinema_movie_entity" DROP CONSTRAINT "FK_282912dbbfa1ed3e475cad08460"`);
        await queryRunner.query(`ALTER TABLE "cinema_movie_entity" DROP CONSTRAINT "FK_af4681771d912a42de772c3cf37"`);
        await queryRunner.query(`ALTER TABLE "cinema_entity" DROP CONSTRAINT "FK_49bcb15fe601ed3a4fa9b96497d"`);
        await queryRunner.query(`ALTER TABLE "show_time_entity" DROP CONSTRAINT "FK_31a3ad78b494065c7e643e4ff03"`);
        await queryRunner.query(`ALTER TABLE "seat_entity" DROP CONSTRAINT "FK_b24759dcff8fb69d8e730d3d1cf"`);
        await queryRunner.query(`DROP TABLE "ticket_entity"`);
        await queryRunner.query(`DROP TABLE "movie_entity"`);
        await queryRunner.query(`DROP TABLE "cinema_movie_entity"`);
        await queryRunner.query(`DROP TABLE "cinema_entity"`);
        await queryRunner.query(`DROP TABLE "show_time_entity"`);
        await queryRunner.query(`DROP TABLE "seat_entity"`);
        await queryRunner.query(`DROP TABLE "cineplex_entity"`);
    }

}
