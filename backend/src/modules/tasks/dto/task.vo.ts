import { ApiProperty } from '@nestjs/swagger';

/**
 * 任务视图对象（响应 VO）
 */
export class TaskVo {
  @ApiProperty({ description: '任务ID', example: 'uuid-xxxx' })
  id: string;

  @ApiProperty({ description: '创建任务的家长ID' })
  parentId: string;

  @ApiProperty({ description: '任务名称' })
  title: string;

  @ApiProperty({ description: '执行频次', enum: ['DAILY', 'WEEKLY'] })
  frequency: 'DAILY' | 'WEEKLY';

  @ApiProperty({ description: '奖励积分数量' })
  rewardPoints: number;

  @ApiProperty({ description: '是否生效' })
  isActive: boolean;

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;
}
