import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { elasticSearchConfig } from '../config/elasticsearch.config';
import { LoggingService } from './service/logging.service';

@Module({
  imports: [ElasticsearchModule.register(elasticSearchConfig)],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
