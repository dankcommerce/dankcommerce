import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import typeormConfig from './config/typeorm.config';
import elasticsearchConfig from './config/elasticsearch.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig, elasticsearchConfig],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigurationModule {}
