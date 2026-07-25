import { ReactNode } from 'react';

/**
 * 全局布局组件
 */
const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="layout-container">
      <header className="app-header">
        <h1>游戏大厅 / 管理系统</h1>
      </header>
      <main className="app-content">
        {/* 页面内容插槽 */}
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
