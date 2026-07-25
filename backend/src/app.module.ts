import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import appConfig from './common/config/app.config';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { AppController } from './app.controller';

/**
 * 应用根模块
 * 装配：全局配置、基础设施（Prisma/Redis）、业务模块
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
    }),
    PrismaModule,
    RedisModule,
    // 业务模块（按领域逐步注册：账号 → 任务 → 审核 → 兑换 → 成长）
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    // 全局异常过滤器与响应拦截器
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
