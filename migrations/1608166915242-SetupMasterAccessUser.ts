import { MigrationInterface, QueryRunner } from 'typeorm';
import * as config from 'config';
import { AccessUserAuthenticationDto } from '../src/authentication/dto/access-user-authentication.dto';
import { AccessUserRepository } from '../src/authentication/repository/access-user.repository';

export class SetupMasterAccessUser1608166915242 implements MigrationInterface {
  private accessUserRepository = new AccessUserRepository();

  public async up(): Promise<void> {
    const { username, password } = config.get('master_access');

    const accessUserAuthenticationDto = new AccessUserAuthenticationDto();
    accessUserAuthenticationDto.username = username;
    accessUserAuthenticationDto.password = password;

    await this.accessUserRepository.createAccessUser(
      accessUserAuthenticationDto,
    );
  }

  public async down(): Promise<void> {
    const { username } = config.get('master_access');

    await this.accessUserRepository.delete({ username });
  }
}
