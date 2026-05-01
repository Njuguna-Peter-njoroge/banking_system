/* eslint-disable no-irregular-whitespace */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './common/enums/middleware/logger/logger.middleware';
import { UsersController } from './users/users.controller';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'post123',
      database: 'banking_system',
      // entities: [createSongDto],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log(dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // option no 1​
    // .forRoutes({ path: 'songs', method: RequestMethod.POST }); //option no 2​
    // consumer​
    // .apply(LoggerMiddleware)​
    consumer.apply(LoggerMiddleware).forRoutes(UsersController); //option no 3​
  }
}
