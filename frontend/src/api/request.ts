/**
 * 统一网络请求封装
 * 基于 uni.request，提供 Token 注入、环境变量读取、统一错误处理和数据解包
 */

// 从环境变量读取 API 基础路径，若未配置则回退到本地开发地址
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

// 后端统一响应结构接口定义
interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 请求配置接口
interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  showLoading?: boolean;
}

/**
 * 发起 HTTP 请求
 * @param options 请求配置
 * @returns Promise<T> 直接返回后端 data 字段内容
 */
export const request = <T = any>(options: RequestOptions): Promise<T> => {
  const { url, method = 'GET', data = {}, showLoading = false } = options;

  if (showLoading) {
    uni.showLoading({ title: '加载中...', mask: true });
  }

  return new Promise((resolve, reject) => {
    // 获取本地存储的 Token（由于尚未实现登录模块，此处会在没有 Token 时注入 mock token 供骨架联通测试）
    const token = uni.getStorageSync('token') || 'dev-token';

    uni.request({
      url: BASE_URL + url,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      success: (res) => {
        const responseData = res.data as ApiResponse<T>;

        // HTTP 状态码 2xx 且业务 code 200 视为成功
        if (res.statusCode >= 200 && res.statusCode < 300 && responseData.code === 200) {
          resolve(responseData.data);
        } else {
          // 统一错误提示
          uni.showToast({
            title: responseData.message || `请求失败(${res.statusCode})`,
            icon: 'none',
          });
          reject(new Error(responseData.message || 'Request Failed'));
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '网络异常，请检查网络连接',
          icon: 'none',
        });
        reject(err);
      },
      complete: () => {
        if (showLoading) {
          uni.hideLoading();
        }
      },
    });
  });
};
