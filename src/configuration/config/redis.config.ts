import * as config from 'config';
import { QueueOptions } from 'bull';
const { host, port } = config.get('redis');

export default () => {
  const redis: QueueOptions = {
    redis: {
      host: process.env.REDIS_HOST || host,
      port: process.env.REDIS_PORT || port,
    },
  };
  return { redis };
};
