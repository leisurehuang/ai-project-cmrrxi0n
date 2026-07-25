import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

/**
 * Redis 全局模块
 * 用途：
 *   1. 高频缓存（任务列表、儿童积分余额、连续打卡天数）
 *   2. 分布式锁（兑换/审核并发场景下防积分超扣）
 */
@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
