import { registerAs } from '@nestjs/config';

const dbConfig = registerAs('db', () => ({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
}));

export default dbConfig;
