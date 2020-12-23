import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticSearchIndexEnum } from '../../elasticsearch/enum/elastic-search-index.enum';

@Injectable()
export class HealthLogService {
  constructor(private elasticsearchService: ElasticsearchService) {}

  log(results: Record<string, any>) {
    this.elasticsearchService.index({
      index: ElasticSearchIndexEnum.HEALTH_LOG,
      body: results,
    });
  }
}
