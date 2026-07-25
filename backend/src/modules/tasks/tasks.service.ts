import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskVo } from './dto/task.vo';

/**
 * 任务服务（骨架）
 * 仅实现 create / listByParent 两个方法作为前后端联通示例
 * 后续完整业务由 IDE 在此基础上扩展
 */
@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 家长创建自定义任务
   */
  async create(parentId: string, dto: CreateTaskDto): Promise<TaskVo> {
    // 校验家长存在（脚手架阶段仅做基础检查）
    const parent = await this.prisma.user.findUnique({ where: { id: parentId } });
    if (!parent) {
      throw new NotFoundException('家长账号不存在');
    }

    const task = await this.prisma.task.create({
      data: {
        parentId,
        title: dto.title,
        frequency: dto.frequency,
        rewardPoints: dto.rewardPoints,
        isActive: dto.isActive ?? true,
      },
    });

    return this.toVo(task);
  }

  /**
   * 按家长查询任务列表
   */
  async listByParent(parentId: string, isActive?: boolean): Promise<TaskVo[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        parentId,
        ...(isActive === undefined ? {} : { isActive }),
      },
      orderBy: { createdAt: 'desc' },
    });

    return tasks.map(this.toVo);
  }

  // -------- 私有工具方法 --------

  private toVo = (task: any): TaskVo => ({
    id: task.id,
    parentId: task.parentId,
    title: task.title,
    frequency: task.frequency,
    rewardPoints: task.rewardPoints,
    isActive: task.isActive,
    createdAt: task.createdAt,
  });
}
