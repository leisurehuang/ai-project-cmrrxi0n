# 使用 Node.js 官方轻量级镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装生产环境依赖
RUN npm install --only=production

# 复制 Prisma schema 并生成 Client
COPY prisma ./prisma/
RUN npx prisma generate

# 复制源代码并编译 TypeScript
COPY . .
RUN npm run build

# 暴露服务端口
EXPOSE 3000

# 启动服务
CMD ["npm", "start"]
