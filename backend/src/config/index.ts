/**
 * 全局配置中心
 * 统一从 process.env 读取并校验环境变量
 */
export const config = {
  port: process.env.PORT || 3000,
  // 微信小游戏 AppID (示例，后续接入时填入真实值)
  wxAppId: process.env.WX_APP_ID || 'mock_wx_app_id',
  // 微信小游戏 Secret (示例)
  wxAppSecret: process.env.WX_APP_SECRET || 'mock_wx_app_secret',
  // JWT 或自定义 Session 密钥 (用于防篡改签名校验)
  jwtSecret: process.env.JWT_SECRET || 'super_secret_key_for_dev',
};
