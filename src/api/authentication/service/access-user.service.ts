import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessUserRepository } from '../repository/access-user.repository';
import { JwtService } from '@nestjs/jwt';
import { AccessUserAuthenticationDto } from '../dto/access-user-authentication.dto';
import { JwtPayloadInterface } from '../interface/JwtPayloadInterface';
import { AccessUserCreationDto } from '../dto/access-user-creation.dto';
import { LoggingService } from '../../../utility/logging/service/logging.service';
import { AccessUserEntity } from '../entity/access-user.entity';
import { RolesEnum } from '../enum/roles.enum';

@Injectable()
export class AccessUserService {
  constructor(
    @InjectRepository(AccessUserRepository)
    private accessUserRepository: AccessUserRepository,
    private jwtService: JwtService,
    private loggingService: LoggingService,
  ) {}

  createAccessUser(
    accessUserCreationDto: AccessUserCreationDto,
  ): Promise<void> {
    return this.accessUserRepository.createAccessUser(accessUserCreationDto);
  }

  async getAccessToken(
    accessUserAuthenticationDto: AccessUserAuthenticationDto,
  ): Promise<{ accessToken: string }> {
    const payload: JwtPayloadInterface = await this.accessUserRepository.validateAccessUserPassword(
      accessUserAuthenticationDto,
    );

    if (!payload) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const accessToken = await this.jwtService.sign(payload);
    this.loggingService.debug(
      `Generated JWT token with payload ${JSON.stringify(payload)}`,
    );
    return {
      accessToken,
    };
  }

  async getByUsername(username: string): Promise<AccessUserEntity> {
    return await this.accessUserRepository.findOne({ username });
  }

  async countByRole(role: RolesEnum): Promise<number> {
    return await this.accessUserRepository.count({ role });
  }
}
