import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessUserRepository } from '../repository/access-user.repository';
import { JwtService } from '@nestjs/jwt';
import { AccessUserAuthenticationDto } from '../dto/access-user-authentication.dto';
import { JwtPayloadInterface } from '../interface/JwtPayloadInterface';
import { AccessUserCreationDto } from '../dto/access-user-creation.dto';

@Injectable()
export class AccessUserService {
  private logger = new Logger('AuthenticationService');

  constructor(
    @InjectRepository(AccessUserRepository)
    private accessUserRepository: AccessUserRepository,
    private jwtService: JwtService,
  ) {}

  createAccessUser(
    accessUserCreationDto: AccessUserCreationDto,
  ): Promise<void> {
    return this.accessUserRepository.createAccessUser(accessUserCreationDto);
  }

  async getAccessToken(
    accessUserAuthenticationDto: AccessUserAuthenticationDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.accessUserRepository.validateAccessUserPassword(
      accessUserAuthenticationDto,
    );

    if (!username) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload: JwtPayloadInterface = { username };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT token with payload ${JSON.stringify(payload)}`,
    );
    return {
      accessToken,
    };
  }
}
