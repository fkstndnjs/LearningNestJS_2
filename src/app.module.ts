import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import emailConfig from './config/emailConfig';
import { UsersModule } from './users/users.module';

console.log('🚀 -------------------------🚀');
console.log('🚀 ~ __dirname', __dirname);
console.log('🚀 -------------------------🚀');
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'dev'
          ? `${__dirname}/config/env/.dev.env`
          : `${__dirname}/config/env/.prod.env`,

      load: [emailConfig],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
