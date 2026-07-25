import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Prisma 服务
 * 继承 PrismaClient，并接入 NestJS 生命周期（启动时连接，销毁时断开）
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { level: 'warn', emit: 'event' },
        { level: 'error', emit: 'event' },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('✅ 数据库连接已建立');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('🛑 数据库连接已关闭');
  }
}
