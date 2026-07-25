# Kids Rewards Backend

儿童习惯养成与积分兑换系统 - 后端服务（NestJS + Prisma + PostgreSQL + Redis）

## 技术栈

- 框架：NestJS 10
- 语言：TypeScript 5
- ORM：Prisma 5
- 数据库：PostgreSQL 16
- 缓存与分布式锁：Redis 7（ioredis）
- 鉴权：JWT（占位，待接入微信登录）
- 文档：Swagger（开发环境自动挂载在 `/api/v1/docs`）

## 快速开始

### 1. 安装依赖

```bash
cd backend
npm install
```

### 2. 启动基础设施（PostgreSQL + Redis）

```bash
docker compose up -d postgres redis
```

### 3. 配置环境变量

```bash
cp .env.example .env
# 按需修改 DATABASE_URL / REDIS_HOST 等
```

### 4. 执行数据库迁移

```bash
npm run prisma:generate
npm run prisma:migrate   # 首次会创建初始迁移并应用
```

### 5. 启动开发服务

```bash
npm run start:dev
```

访问入口：

- API：http://localhost:3000/api/v1
- Swagger：http://localhost:3000/api/v1/docs
- 健康检查：http://localhost:3000/api/v1/health

## 示例接口（前后端联通验证）

```bash
# 创建任务
 curl -X POST http://localhost:3000/api/v1/tasks \
   -H "Authorization: Bearer dev-token" \
   -H "Content-Type: application/json" \
   -d '{"title":"阅读20分钟","frequency":"DAILY","rewardPoints":10}'

# 查询任务列表
curl -H "Authorization: Bearer dev-token" \
  http://localhost:3000/api/v1/tasks
```

## 目录结构

```
backend/
├── prisma/
│   └── schema.prisma              # 数据库 Schema
├── src/
│   ├── common/                    # 公共能力
│   │   ├── config/                # 环境变量
│   │   ├── decorators/            # 装饰器
│   │   ├── filters/               # 异常过滤器
│   │   ├── guards/                # 鉴权 Guard
│   │   ├── interceptors/          # 响应拦截器
│   │   └── middleware/            # 请求中间件
│   ├── modules/                   # 业务模块（按领域划分）
│   │   └── tasks/                 # 任务模块（示例）
│   ├── prisma/                    # Prisma 封装
│   ├── redis/                     # Redis 封装
│   ├── app.controller.ts          # 健康检查
│   ├── app.module.ts              # 根模块
│   └── main.ts                    # 入口
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## 后续开发指引

1. 按业务领域依次实现：账号 → 任务 → 审核 → 兑换 → 成长
2. 每个模块遵循 `Controller / Service / DTO / VO` 分层
3. 高并发场景（兑换、积分扣减）必须使用 `Redis 分布式锁 + Prisma 乐观锁 version` 双重保障
4. 长耗时任务（审核结算、Streak 计算、微信订阅消息下发）应走事件驱动 / BullMQ 异步处理
