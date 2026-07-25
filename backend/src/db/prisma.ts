import { PrismaClient } from '@prisma/client';

/**
 * Prisma 客户端单例
 * 避免在开发热重载时建立过多的数据库连接
 */
const prismaClient = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export default prismaClient;
