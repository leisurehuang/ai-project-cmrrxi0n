import prisma from '../../db/prisma';
import { PlayerService } from '../player/player.service';

/**
 * 认证模块服务层
 */
export const AuthService = {
  /**
   * 使用微信 code 登录并处理玩家存档
   * @param code 微信 wx.login 返回的临时 code
   */
  loginWithWechatCode: async (code: string) => {
    // --- 以下是骨架的 Mock 逻辑 ---
    // 实际实现应调用微信接口: https://api.weixin.qq.com/sns/jscode2session 换取 openid
    const mockOpenid = `wx_openid_${code}`; // 模拟根据 code 算出的 openid
    
    // 查询或创建玩家档案
    let playerProfile = await PlayerService.getProfileByOpenid(mockOpenid);
    if (!playerProfile) {
      playerProfile = await PlayerService.createDefaultProfile(mockOpenid);
    }

    // 生成自定义 SessionKey/Token (此处简化，实际需结合 JWT 或 Redis)
    const sessionToken = `session_token_for_${mockOpenid}`;

    // 按照接口文档返回特定结构
    return {
      sessionToken,
      playerData: {
        coins: playerProfile.coins,
        talents: playerProfile.talents,
        maxWave: playerProfile.maxWave
      }
    };
  }
};
