import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { LoggerService } from '@nestjs/common/services/logger.service';
import { ElasticSearchIndexEnum } from '../../elasticsearch/enum/elastic-search-index.enum';

@Injectable()
export class LoggingService implements LoggerService {
  private logger = new Logger('LoggingService');

  constructor(private elasticsearchService: ElasticsearchService) {}

  debug(message: any, context?: string): any {
    this.callFunction('debug', message, context);
  }

  error(message: any, trace?: string, context?: string): any {
    this.callFunction('error', message, context);
  }

  log(message: any, context?: string): any {
    this.callFunction('log', message, context);
  }

  verbose(message: any, context?: string): any {
    this.callFunction('verbose', message, context);
  }

  warn(message: any, context?: string): any {
    this.callFunction('warn', message, context);
  }

  private callFunction(level: string, message: any, context?: string) {
    this.logger[level](message, context);
    this.elasticsearchService.index({
      index: `${ElasticSearchIndexEnum.GENERIC_LOG}-${level}`.toLowerCase(),
      body: {
        level,
        message: JSON.stringify(message),
        context,
      },
    });
  }
}
