import { Module } from '@nestjs/common';
import { AccessUserRepository } from './repository/access-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { AccessUserService } from './service/access-user.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthenticationController } from './controller/authentication.controller';
import { AccessUserController } from './controller/access-user.controller';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    TypeOrmModule.forFeature([AccessUserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
  ],
  providers: [AccessUserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
  controllers: [AuthenticationController, AccessUserController],
})
export class AuthenticationModule {}
