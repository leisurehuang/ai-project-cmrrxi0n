import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * JWT 解析后的用户载荷
 * 实际签发逻辑由 AuthService 完成（后续模块接入）
 */
export interface JwtPayload {
  userId: string;
  role: 'PARENT' | 'CHILD';
  parentId?: string;
}

/**
 * @CurrentUser() 装饰器
 * 从 request.user 中提取当前登录用户信息
 * 用法：
 *   @CurrentUser() user: JwtPayload            // 取整个 payload
 *   @CurrentUser('userId') userId: string      // 取单个字段
 */
export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: JwtPayload = request.user;
    return data ? user?.[data] : user;
  },
);
