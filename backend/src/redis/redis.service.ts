import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

/**
 * Redis 服务封装
 * 提供基础缓存能力，并预留分布式锁接口（兑换防超扣场景使用）
 */
@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private readonly client: Redis;

  constructor(private readonly config: ConfigService) {
    this.client = new Redis({
      host: config.get<string>('app.redis.host'),
      port: config.get<number>('app.redis.port'),
      password: config.get<string>('app.redis.password'),
      db: config.get<number>('app.redis.db'),
      lazyConnect: false,
      maxRetriesPerRequest: 3,
    });

    this.client.on('connect', () => this.logger.log('✅ Redis 已连接'));
    this.client.on('error', (err) => this.logger.error(`Redis 异常：${err.message}`));
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds && ttlSeconds > 0) {
      await this.client.set(key, value, 'EX', ttlSeconds);
    } else {
      await this.client.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  /**
   * 简单分布式锁（NX + EX）
   * 返回 true 表示获取成功
   * TODO：兑换场景应包装为「重试 + 自动续期 + Lua 释放」的完整方案
   */
  async acquireLock(key: string, ttlSeconds: number): Promise<boolean> {
    const token = `${Date.now()}`;
    const result = await this.client.set(key, token, 'EX', ttlSeconds, 'NX');
    return result === 'OK';
  }

  getClient(): Redis {
    return this.client;
  }

  async onModuleDestroy() {
    await this.client.quit();
    this.logger.log('🛑 Redis 连接已关闭');
  }
}
