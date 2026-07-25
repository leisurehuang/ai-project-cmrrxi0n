import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* BrowserRouter 提供 Web 端路由上下文 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
