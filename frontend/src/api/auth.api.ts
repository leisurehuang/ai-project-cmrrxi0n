import apiClient from './client';

// 登录接口入参定义
interface LoginParams {
  code: string;
}

// 登录接口响应结构定义
interface LoginResult {
  code: number;
  message: string;
  data: {
    sessionToken: string;
    playerData: {
      coins: number;
      talents: Record<string, number>;
      maxWave: number;
    };
  };
}

/**
 * 认证服务 API
 */
export const AuthApi = {
  /**
   * 调用登录接口
   * @param params 包含微信 code 的对象
   * @returns Promise<LoginResult>
   */
  login: (params: LoginParams): Promise<LoginResult> => {
    // 调用 /auth/login 路径，最终请求地址为 baseURL + '/auth/login'
    return apiClient.post('/auth/login', params);
  },
};
