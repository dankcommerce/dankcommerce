const config = require('config');
const dbConfig = config.get('db');

module.exports = {
  type: dbConfig.type,
  host: process.env.RDB_HOSTNAME || dbConfig.host,
  port: process.env.RDB_PORT || dbConfig.port,
  username: process.env.RDB_USERNAME || dbConfig.username,
  password: process.env.RDB_PASSWORD || dbConfig.password,
  database: process.env.RDB_DB_NAME || dbConfig.database,
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
  cli: {
    migrationsDir: 'migrations',
  },
  migrations: [__dirname + '/migrations/**/*.ts'],
  entities: [__dirname + '/src/../**/*.entity.ts'],
};
