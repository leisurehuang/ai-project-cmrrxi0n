import express, { Request, Response } from 'express';
import cors from 'cors';
import loggerMiddleware from './middlewares/logger.middleware';
import errorMiddleware from './middlewares/error.middleware';
import authRoutes from './modules/auth/auth.routes';

// 初始化 Express 应用
const app = express();

// 基础中间件
app.use(cors()); // 跨域支持
app.use(express.json()); // 解析 JSON 请求体
app.use(express.urlencoded({ extended: true })); // 解析 URL-encoded 请求体

// 自定义全局中间件
app.use(loggerMiddleware); // 请求日志记录

// 健康检查接口
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: '服务运行正常' });
});

// 注册业务路由模块
app.use('/api/v1/auth', authRoutes);

// 全局错误处理中间件（必须放在所有路由和中间件之后注册）
app.use(errorMiddleware);

export default app;
