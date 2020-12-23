import { Module } from '@nestjs/common';
import { LoggingService } from './service/logging.service';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';

@Module({
  imports: [ElasticsearchModule],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
