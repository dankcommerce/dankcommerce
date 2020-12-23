import { Module } from '@nestjs/common';
import { LoggingModule } from './logging/logging.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [LoggingModule, HealthModule],
  controllers: [],
  providers: [],
})
export class UtilityModule {}
