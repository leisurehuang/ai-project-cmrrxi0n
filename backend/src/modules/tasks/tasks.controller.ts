import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskVo } from './dto/task.vo';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { CurrentUser, JwtPayload } from '../../../common/decorators/current-user.decorator';

/**
 * 任务控制器（示例 CRUD，用于前后端联通验证）
 * 对应方案接口：
 *   - POST /api/v1/tasks   家长创建自定义任务
 *   - GET  /api/v1/tasks   获取任务列表
 */
@ApiTags('任务')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: '家长创建自定义任务（示例）' })
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateTaskDto,
  ): Promise<TaskVo> {
    // TODO：实际业务应校验 user.role === 'PARENT'
    return this.tasksService.create(user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: '获取任务列表（示例）' })
  async list(
    @CurrentUser() user: JwtPayload,
    @Query('isActive') isActive?: boolean,
  ): Promise<TaskVo[]> {
    return this.tasksService.listByParent(user.userId, isActive);
  }
}
