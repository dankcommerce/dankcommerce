import { Module } from '@nestjs/common';
import {
  ElasticsearchModule as ElasticSearchModule,
  ElasticsearchModuleOptions,
} from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ElasticSearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configurationService: ConfigService) =>
        configurationService.get<ElasticsearchModuleOptions>('elasticsearch'),
      inject: [ConfigService],
    }),
  ],
  exports: [ElasticSearchModule],
})
export class ElasticsearchModule {}
