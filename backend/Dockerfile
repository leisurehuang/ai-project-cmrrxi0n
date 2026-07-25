# ===== 阶段 1：依赖安装与构建 =====
FROM node:20-alpine AS builder

WORKDIR /app

# 利用 Docker 缓存：先拷贝依赖描述
COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

# 生成 Prisma Client 并编译 TypeScript
RUN npx prisma generate
RUN npm run build

# ===== 阶段 2：运行时镜像 =====
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# 仅拷贝运行所需文件
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

EXPOSE 3000

# 生产部署前应执行：npx prisma migrate deploy
CMD ["node", "dist/main.js"]
