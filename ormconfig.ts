import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'test',
  entities: ['src/**/*.entity{.ts, .js}'],
  synchronize: false,
  migrations: ['src/migrations/*{.js, .ts}'],
  migrationsTableName: 'migrations',
});
