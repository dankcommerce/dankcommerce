import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDB_HOSTNAME || dbConfig.host,
  port: process.env.RDB_PORT || dbConfig.port,
  username: process.env.RDB_USERNAME || dbConfig.username,
  password: process.env.RDB_PASSWORD || dbConfig.password,
  database: process.env.RDB_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};
