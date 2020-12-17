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
    private userRepository: AccessUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('jwt.secret'),
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<AccessUserEntity> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
