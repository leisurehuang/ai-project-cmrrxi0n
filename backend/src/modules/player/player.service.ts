import prisma from '../../db/prisma';

/**
 * 玩家档案服务层
 */
export const PlayerService = {
  /**
   * 根据 openid 获取玩家档案
   */
  getProfileByOpenid: async (openid: string) => {
    return await prisma.playerProfile.findUnique({
      where: { openid }
    });
  },

  /**
   * 创建默认的玩家档案
   */
  createDefaultProfile: async (openid: string) => {
    return await prisma.playerProfile.create({
      data: {
        openid,
        coins: 0, // 初始金币
        maxWave: 0, // 初始最高波数
        talents: { hp: 0, speed: 0 }, // 初始天赋树结构
        activeSkin: 'default' // 默认皮肤ID
      }
    });
  }
};
