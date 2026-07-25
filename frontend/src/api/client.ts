import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// 从环境变量读取 API 基础路径
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

/**
 * 创建 Axios 实例
 */
const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 请求拦截器
 * 用于在请求发送前统一处理，如注入 SessionToken
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从本地存储获取 Token（如果存在）
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      config.headers.Authorization = `Bearer ${sessionToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 * 统一剥离业务数据和错误处理
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 直接返回 data 部分，方便业务调用
    return response.data;
  },
  (error) => {
    // 统一的 HTTP 错误处理
    console.error('[API Error]:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
