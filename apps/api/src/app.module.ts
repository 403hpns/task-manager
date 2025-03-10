import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { GqlThrottlerGuard } from './common/guards/gql-throttler.guard';
import { graphqlConfig } from './config/graphql.config';
import { throttlerConfig } from './config/throttler.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot(graphqlConfig),
    ThrottlerModule.forRoot(throttlerConfig),
    MongooseModule.forRoot('mongodb://mongo:mongo@localhost:27017/'),
    TasksModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule {}
