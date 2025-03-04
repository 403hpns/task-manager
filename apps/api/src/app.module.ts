import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { graphqlConfig } from './config/graphql.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot(graphqlConfig),
    MongooseModule.forRoot('mongodb://mongo:mongo@localhost:27017/'),
    TasksModule,
  ],
})
export class AppModule {}
