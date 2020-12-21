import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controller/health.controller';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AccessUserHealthIndicator } from '../authentication/health/access-user.health';

@Module({
  imports: [TerminusModule, AuthenticationModule],
  providers: [AccessUserHealthIndicator],
  controllers: [HealthController],
})
export class HealthModule {}
