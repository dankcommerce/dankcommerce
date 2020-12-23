import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controller/health.controller';
import { AuthenticationModule } from '../../api/authentication/authentication.module';
import { AccessUserHealthIndicator } from '../../api/authentication/health/access-user.health';
import { ElasticsearchModule } from '../../core/elasticsearch/elasticsearch.module';
import { HealthLogService } from './service/health-log.service';

@Module({
  imports: [TerminusModule, AuthenticationModule, ElasticsearchModule],
  providers: [AccessUserHealthIndicator, HealthLogService],
  controllers: [HealthController],
})
export class HealthModule {}
