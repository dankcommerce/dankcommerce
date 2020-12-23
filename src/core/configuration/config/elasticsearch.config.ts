import * as config from 'config';
import { ElasticsearchModuleOptions } from '@nestjs/elasticsearch';
const { node } = config.get('elastic_search');

export default () => {
  const elasticsearch: ElasticsearchModuleOptions = {
    node: process.env.ELASTICSEARCH_NODE || node,
  };
  return { elasticsearch };
};
