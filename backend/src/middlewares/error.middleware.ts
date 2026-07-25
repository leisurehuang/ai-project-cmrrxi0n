import { Request, Response, NextFunction } from 'express';

/**
 * 自定义业务异常类
 */
export class ApiException extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * 全局错误处理中间件
 */
export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error] ${err.message}`);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || '服务器内部错误';
  
  // 统一的错误响应格式
  res.status(statusCode).json({
    code: statusCode,
    message,
    // 仅在开发环境返回详细错误堆栈
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export default errorMiddleware;
