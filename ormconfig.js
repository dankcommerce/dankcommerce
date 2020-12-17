const config = require('config');
const dbConfig = config.get('db');

module.exports = {
  type: dbConfig.type,
  host: process.env.RDB_HOSTNAME || dbConfig.host,
  port: process.env.RDB_PORT || dbConfig.port,
  username: process.env.RDB_USERNAME || dbConfig.username,
  password: process.env.RDB_PASSWORD || dbConfig.password,
  database: process.env.RDB_DB_NAME || dbConfig.database,
  entities: [__dirname + '/src/../**/*.entity.{js,ts}'],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
  cli: {
    migrationsDir: 'migrations',
  },
};
