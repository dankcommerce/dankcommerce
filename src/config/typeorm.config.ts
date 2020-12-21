import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
const {
  type,
  host,
  port,
  username,
  password,
  database,
  synchronize,
} = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: type,
  host: process.env.RDB_HOSTNAME || host,
  port: process.env.RDB_PORT || port,
  username: process.env.RDB_USERNAME || username,
  password: process.env.RDB_PASSWORD || password,
  database: process.env.RDB_DB_NAME || database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.TYPEORM_SYNC || synchronize,
};
