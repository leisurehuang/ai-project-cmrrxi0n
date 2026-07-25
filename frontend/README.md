# Kids Rewards Frontend

儿童习惯养成与积分兑换系统 - 前端服务 (uni-app + Vue3 + TailwindCSS)

## 技术栈

- 框架：uni-app (Vue3)
- 样式：TailwindCSS (适配小程序)
- 语言：TypeScript

## 环境准备

1. 安装 [Node.js](https://nodejs.org/) (推荐 v18 或 v20)
2. 如果开发微信小程序，请下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

## 快速开始

### 1. 安装依赖

```bash
cd frontend
npm install
```

### 2. 配置环境变量

在 `frontend` 目录下创建 `.env` 文件：

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

### 3. 启动 H5 开发服务器 (最快速的联通测试方式)

确保后端服务 (`backend`) 已经启动。

```bash
npm run dev:h5
```

浏览器会自动打开，点击首页的 "查看任务列表" 按钮即可跳转到示例任务列表页面。如果列表正常加载展示，说明前后端已成功联通！

### 4. 启动微信小程序开发

```bash
npm run dev:mp-weixin
```

编译完成后，会在 `dist/dev/mp-weixin` 目录生成小程序代码。
打开微信开发者工具，导入该目录即可预览。

**注意：**
由于微信小程序对请求域名有严格限制，在开发环境下请在微信开发者工具中勾选：
`详情 -> 本地设置 -> 不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书`。

## 目录结构

```
frontend/
├── src/
│   ├── api/                  # 网络请求与接口定义
│   │   ├── request.ts        # 请求封装
│   │   └── tasks.api.ts      # 示例接口
│   ├── components/           # 公共组件
│   ├── pages/                # 页面目录
│   ├── App.vue
│   ├── main.ts
│   ├── pages.json            # 路由配置
│   └── manifest.json         # uni-app 配置
├── tailwind.config.js        # Tailwind 配置
└── package.json
```
