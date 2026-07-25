import app from './app';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 获取启动端口，默认 3000
const PORT = process.env.PORT || 3000;

// 启动 Express 服务
app.listen(PORT, () => {
  console.log(`[Server] 小游戏后端服务已成功启动`);
  console.log(`[Server] 正在监听端口: ${PORT}`);
  console.log(`[Server] 接口基准地址: http://localhost:${PORT}/api/v1`);
});
