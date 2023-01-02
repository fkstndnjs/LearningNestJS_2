import { DataSource } from 'typeorm';

console.log('🚀 ---------------------------------------------------------🚀');
console.log('🚀 ~ process.env.DATABASE_HOST', process.env.DATABASE_HOST);
console.log('🚀 ---------------------------------------------------------🚀');

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: 'test',
  entities: [__dirname + '/**/*.entity{.ts, .js}'],
  synchronize: false,
  migrations: [__dirname + '/**/migrations/*.js'],
  migrationsTableName: 'migrations',
});
