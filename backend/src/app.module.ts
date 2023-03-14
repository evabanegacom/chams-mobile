import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoEntity } from '../Todo';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [TodoEntity], // or [__dirname + '/**/*.entity{.ts,.js}']
    synchronize: true,
  }), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
