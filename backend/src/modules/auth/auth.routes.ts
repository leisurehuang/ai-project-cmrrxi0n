import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();

/**
 * @route POST /api/v1/auth/login
 * @desc 使用微信 wx.login 获取的 code 登录，返回 session 和存档
 */
router.post('/login', AuthController.login);

export default router;
