import { Request, Response, NextFunction } from 'express';

/**
 * 简易的请求日志中间件
 */
export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  
  // 监听响应完成事件
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`[Logger] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });

  next();
};

export default loggerMiddleware;
