import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

/**
 * 创建任务 DTO
 * 对齐方案 Task 实体字段
 */
export class CreateTaskDto {
  @ApiProperty({ description: '任务名称', example: '阅读20分钟', maxLength: 50 })
  @IsString()
  @MaxLength(50)
  title: string;

  @ApiProperty({ description: '执行频次', enum: ['DAILY', 'WEEKLY'], example: 'DAILY' })
  @IsEnum(['DAILY', 'WEEKLY'])
  frequency: 'DAILY' | 'WEEKLY';

  @ApiProperty({ description: '奖励积分数量', example: 10, minimum: 1, maximum: 1000 })
  @IsInt()
  @Min(1)
  @Max(1000)
  rewardPoints: number;

  @ApiPropertyOptional({ description: '任务是否生效', example: true, default: true })
  @IsBoolean()
  isActive?: boolean;
}
