import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * 全局异常过滤器
 * 职责：捕获所有抛出的异常，统一序列化为 { code, message, data: null }
 * 对 5xx 错误额外记录堆栈，便于排查
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '服务器内部错误';
    let code: number | string = status;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const r = res as Record<string, any>;
        message = Array.isArray(r.message) ? r.message[0] : r.message || message;
        code = r.code ?? status;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    // 非 4xx 错误记录完整堆栈
    if (status >= 500) {
      this.logger.error(
        `[${request.method}] ${request.url} -> ${status}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    } else {
      this.logger.warn(`[${request.method}] ${request.url} -> ${status} ${message}`);
    }

    response.status(status).json({
      code,
      message,
      data: null,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
