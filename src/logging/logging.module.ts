import { Module } from '@nestjs/common';
import { LoggingService } from './service/logging.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Module({
  imports: [ElasticsearchService],
  providers: [ElasticsearchService, LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
