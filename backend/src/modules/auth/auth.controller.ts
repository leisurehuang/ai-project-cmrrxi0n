import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { ApiException } from '../../middlewares/error.middleware';

/**
 * 认证模块控制器
 */
export const AuthController = {
  /**
   * 处理玩家登录请求
   */
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.body;
      
      // 基础参数校验
      if (!code) {
        throw new ApiException(400, '缺少微信登录 code 参数');
      }

      // 调用服务层处理具体业务
      const result = await AuthService.loginWithWechatCode(code);

      // 返回统一格式的响应
      res.status(200).json({
        code: 0,
        message: '登录成功',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
};
