import { useState } from 'react';
import { AuthApi } from '../api/auth.api';

/**
 * 示例：登录页面组件
 * 用于验证前后端接口联通性
 */
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState<string>('');

  // 模拟点击登录按钮
  const handleLogin = async () => {
    setLoading(true);
    setResponseMsg('正在请求后端接口...');

    try {
      // 实际微信环境中应先调用 wx.login() 获取 code
      // 这里模拟生成一个随机的测试 code
      const mockCode = `mock_code_${Math.floor(Math.random() * 1000)}`;
      
      // 调用封装好的 API 接口
      const res = await AuthApi.login({ code: mockCode });
      
      // 校验后端返回的业务状态码
      if (res.code === 0) {
        // 保存 Token 到本地
        localStorage.setItem('sessionToken', res.data.sessionToken);
        setResponseMsg(`登录成功！获得金币: ${res.data.playerData.coins}，历史最高波数: ${res.data.playerData.maxWave}`);
      } else {
        setResponseMsg(`业务错误: ${res.message}`);
      }
    } catch (error: any) {
      // 异常处理
      setResponseMsg(`请求失败: ${error.message || '未知错误'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>欢迎来到复古射击游戏</h2>
      <p>点击下方按钮，测试前后端是否联通（调用 POST /api/v1/auth/login）</p>
      
      <button 
        onClick={handleLogin} 
        disabled={loading}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        {loading ? '登录中...' : '一键登录 (测试)'}
      </button>

      {responseMsg && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
          <strong>后端响应结果：</strong>
          <br />
          {responseMsg}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
