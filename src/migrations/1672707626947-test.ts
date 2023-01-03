import { MigrationInterface, QueryRunner } from 'typeorm';

export class test1672707626947 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE User (id bigint NOT NULL, name varchar(30) NOT NULL, PRIMARY KEY (id))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE 'User'");
  }
}
