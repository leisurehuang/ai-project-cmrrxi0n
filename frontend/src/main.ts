import { createSSRApp } from 'vue';
import App from './App.vue';

// 引入 TailwindCSS
import '../tailwind.config.js';
import './style.css';

// 创建 uni-app 应用实例
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
