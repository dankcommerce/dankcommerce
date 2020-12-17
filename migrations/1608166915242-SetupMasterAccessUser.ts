import { MigrationInterface, QueryRunner } from 'typeorm';
import { AccessUserEntity } from '../src/authentication/entity/access-user.entity';
import * as config from 'config';

export class SetupMasterAccessUser1608166915242 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const { username, password } = config.get('master_access');

    const accessUser = new AccessUserEntity();
    accessUser.username = username;
    accessUser.salt = username;
    // TODO: Make work
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // TODO: Make work
  }
}
