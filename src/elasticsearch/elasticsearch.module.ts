import { Module } from '@nestjs/common';
import {
  ElasticsearchModule as ElasticSearchModule,
  ElasticsearchModuleOptions,
  ElasticsearchService,
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
  providers: [ElasticsearchService],
  exports: [ElasticsearchService],
})
export class ElasticsearchModule {}
