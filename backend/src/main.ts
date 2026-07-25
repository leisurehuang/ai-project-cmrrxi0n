import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

/**
 * 应用入口
 * 职责：创建应用实例、挂载全局管道/过滤器/拦截器、启动 HTTP 服务
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);

  // 全局 API 前缀，对齐方案 /api/v1
  const apiPrefix = configService.get<string>('app.apiPrefix', 'api/v1');
  app.setGlobalPrefix(apiPrefix);

  // 全局 CORS（小程序 + H5 调试需要）
  app.enableCors({
    origin: configService.get<string>('app.corsOrigin', '*'),
    credentials: true,
  });

  // 全局 ValidationPipe：自动剔除未声明字段、隐式类型转换
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // 全局过滤器：统一异常响应格式 { code, message, data }
  app.useGlobalFilters(new AllExceptionsFilter());

  // 全局拦截器：统一成功响应格式 { code: 200, message: 'success', data }
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger 文档（非生产环境开启）
  if (configService.get<string>('app.nodeEnv') !== 'production') {
    const docConfig = new DocumentBuilder()
      .setTitle('Kids Rewards API')
      .setDescription('儿童习惯养成与积分兑换系统 - 接口文档')
      .setVersion('0.1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, docConfig);
    SwaggerModule.setup(`${apiPrefix}/docs`, app, document);
  }

  const port = configService.get<number>('app.port', 3000);
  await app.listen(port);

  Logger.log(`🚀 应用已启动：http://localhost:${port}/${apiPrefix}`, 'Bootstrap');
  Logger.log(`📖 Swagger 文档：http://localhost:${port}/${apiPrefix}/docs`, 'Bootstrap');
}

bootstrap();
