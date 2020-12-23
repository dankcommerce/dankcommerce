import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModule } from './database/database.module';
import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';
import { RedisModule } from './redis/redis.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ConfigurationModule,
    EventModule,
    DatabaseModule,
    ElasticsearchModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class CoreModule {}
