import { MigrationInterface } from 'typeorm';
import * as config from 'config';
import { AccessUserRepository } from '../src/api/authentication/repository/access-user.repository';
import { AccessUserCreationDto } from '../src/api/authentication/dto/access-user-creation.dto';
import { RolesEnum } from '../src/api/authentication/enum/roles.enum';

export class SetupMasterAccessUser1608166915242 implements MigrationInterface {
  private accessUserRepository = new AccessUserRepository();

  public async up(): Promise<void> {
    const { username, password } = config.get('master_access');

    const accessUserCreationDto = new AccessUserCreationDto();
    accessUserCreationDto.username = username;
    accessUserCreationDto.role = RolesEnum.ROOT;
    accessUserCreationDto.password = password;

    await this.accessUserRepository.createAccessUser(accessUserCreationDto);
  }

  public async down(): Promise<void> {
    const { username } = config.get('master_access');

    await this.accessUserRepository.delete({ username });
  }
}
