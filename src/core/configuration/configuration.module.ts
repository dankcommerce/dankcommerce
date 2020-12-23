import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import typeormConfig from './config/typeorm.config';
import elasticsearchConfig from './config/elasticsearch.config';
import redisConfig from './config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig, elasticsearchConfig, redisConfig],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigurationModule {}
