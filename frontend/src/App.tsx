import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <MainLayout>
      {/* 路由配置骨架 */}
      <Routes>
        {/* 示例页面：对接后端登录接口 */}
        <Route path="/" element={<LoginPage />} />
        {/* 后续业务页面请在此处添加 Route，例如：
        <Route path="/hall" element={<GameHallPage />} />
        <Route path="/battle" element={<BattlePage />} />
        */}
      </Routes>
    </MainLayout>
  );
}

export default App;
