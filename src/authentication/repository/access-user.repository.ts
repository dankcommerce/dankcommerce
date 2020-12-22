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
  async validateAccessUserPassword(
    accessUserAuthenticationDto: AccessUserAuthenticationDto,
  ): Promise<{ username: string; role: string }> {
    const { username, password } = accessUserAuthenticationDto;
    const accessUser = await this.findOne({ username });
    if (accessUser && (await accessUser.validatePassword(password))) {
      const { username, role } = accessUser;
      return { username, role };
    }
    return null;
  }

  async createAccessUser(
    accessUserCreationDto: AccessUserCreationDto,
  ): Promise<void> {
    const { username, password, role } = accessUserCreationDto;

    try {
      const user = new AccessUserEntity();
      user.username = username;
      user.role = role;
      user.salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, user.salt);
      await user.save();
    } catch (error) {
      const { code } = error;
      if (code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
