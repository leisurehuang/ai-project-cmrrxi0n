import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * 请求日志中间件
 * 记录每个 HTTP 请求的方法、路径、状态码与耗时，便于性能与问题排查
 */
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      this.logger.log(`${method} ${originalUrl} ${res.statusCode} ${duration}ms`);
    });

    next();
  }
}
