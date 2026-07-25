import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

// Vite 配置文件
// uni-app 官方推荐使用 @dcloudio/vite-plugin-uni 插件进行多端编译
export default defineConfig({
  plugins: [uni()],
});
