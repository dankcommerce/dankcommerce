import { EntityRepository, Repository } from 'typeorm';
import { AccessUserEntity } from '../entity/access-user.entity';
import { AccessUserAuthenticationDto } from '../dto/access-user-authentication.dto';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AccessUserCreationDto } from '../dto/access-user-creation.dto';

@EntityRepository(AccessUserEntity)
export class AccessUserRepository extends Repository<AccessUserEntity> {
  private logger = new Logger('AccessUserRepository');

  async validateAccessUserPassword(
    accessUserAuthenticationDto: AccessUserAuthenticationDto,
  ): Promise<string> {
    const { username, password } = accessUserAuthenticationDto;
    const accessUser = await this.findOne({ username });
    if (accessUser && (await accessUser.validatePassword(password))) {
      this.logger.log(
        `User with username ${username} successfully authenticated`,
      );
      return accessUser.username;
    }
    return null;
  }

  async createAccessUser(
    accessUserCreationDto: AccessUserCreationDto,
  ): Promise<void> {
    const { username, password } = accessUserCreationDto;

    try {
      const user = new AccessUserEntity();
      user.username = username;
      user.salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, user.salt);
      await user.save();
      this.logger.log(`User with username ${username} successfully created`);
    } catch (error) {
      const { code } = error;
      if (code === '23505') {
        throw new ConflictException('User name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
