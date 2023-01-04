import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'test',
  synchronize: false,
  migrations: [__dirname + '/**/migrations/*.js'],
  migrationsTableName: 'migrations',
});
