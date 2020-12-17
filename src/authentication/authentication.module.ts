import { Module } from '@nestjs/common';
import { AccessUserRepository } from './repository/access-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { AuthenticationService } from './service/authentication.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthenticationController } from './controller/authentication.controller';

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
  providers: [AuthenticationService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
