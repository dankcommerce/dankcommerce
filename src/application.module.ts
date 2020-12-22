import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { LoggingModule } from './logging/logging.module';
import { HealthModule } from './health/health.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModule } from './database/database.module';
import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    ElasticsearchModule,
    LoggingModule,
    AuthenticationModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
