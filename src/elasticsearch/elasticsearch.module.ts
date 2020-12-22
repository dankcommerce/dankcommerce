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
      useFactory: async (configurationService: ConfigService) =>
        await configurationService.get('elasticsearch'),
      inject: [ConfigService],
    }),
  ],
})
export class ElasticsearchModule {}
