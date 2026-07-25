import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * JWT 鉴权 Guard（骨架版）
 * 说明：实际项目中应配合 PassportStrategy + passport-jwt 完整实现。
 * 此处仅作占位，便于 Controller 通过 @UseGuards(JwtAuthGuard) 标注受保护路由。
 * TODO：接入微信登录后，由 AuthService 签发 JWT，并在请求头 Authorization: Bearer <token> 校验
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'] || '';

    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('缺少有效的身份凭证');
    }

    // TODO: 在此校验 JWT 并填充 request.user（JwtPayload）
    // const token = authHeader.slice(7);
    // const payload = this.jwtService.verify(token);
    // request.user = payload;

    // 骨架阶段：临时构造一个 mock 用户便于联通联调
    request.user = {
      userId: '00000000-0000-0000-0000-000000000000',
      role: 'PARENT',
    };

    return true;
  }
}
