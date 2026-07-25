import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

/**
 * 应用根控制器：健康检查与系统信息
 */
@ApiTags('系统')
@Controller()
export class AppController {
  @Get('health')
  @ApiOperation({ summary: '健康检查' })
  health() {
    return {
      status: 'ok',
      service: 'kids-rewards-backend',
      timestamp: new Date().toISOString(),
    };
  }
}
