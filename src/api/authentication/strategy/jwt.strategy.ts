import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayloadInterface } from '../interface/JwtPayloadInterface';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessUserRepository } from '../repository/access-user.repository';
import { AccessUserEntity } from '../entity/access-user.entity';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AccessUserRepository)
    private accessUserRepository: AccessUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('jwt.secret'),
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<AccessUserEntity> {
    const { username } = payload;
    const accessUser = await this.accessUserRepository.findOne({ username });

    if (!accessUser) {
      throw new UnauthorizedException();
    }

    return accessUser;
  }
}
