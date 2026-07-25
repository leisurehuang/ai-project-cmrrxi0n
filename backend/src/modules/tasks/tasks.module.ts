import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

/**
 * 任务与模板模块
 * 职责（骨架）：支撑家长配置日常任务，并提供任务列表查询
 * 完整实现将包含：模板库、频次调度、儿童端任务聚合分发等
 */
@Module({
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
