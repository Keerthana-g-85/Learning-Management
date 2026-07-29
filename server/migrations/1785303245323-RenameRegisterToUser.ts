import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameRegisterToUser1785303245323 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("register", "user");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("user", "register");
  }
}
