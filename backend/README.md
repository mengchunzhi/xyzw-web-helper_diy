# 咸鱼之王辅助工具后端

## 项目介绍

本项目是咸鱼之王游戏辅助工具的后端服务，用于管理游戏令牌和定时任务，支持在服务器端执行游戏操作，无需浏览器前台运行。

## 技术栈

- Node.js + Express
- Supabase (数据库)
- WebSocket (游戏通信)
- node-cron (定时任务)
- Render (部署平台)

## 功能特性

- **令牌管理**：创建、更新、删除和查询游戏令牌
- **任务管理**：创建、更新、删除和执行定时任务
- **WebSocket 连接**：与游戏服务器建立稳定的 WebSocket 连接
- **定时任务**：支持 cron 表达式的定时任务调度
- **执行记录**：记录任务执行历史和结果
- **健康检查**：提供 API 健康状态检查

## 快速开始

### 1. 环境配置

1. 复制 `.env.example` 文件为 `.env`
2. 填写 Supabase 配置信息

```bash
# 服务器配置
PORT=3001
NODE_ENV=development

# Supabase 配置
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY

# WebSocket 配置
WS_HEARTBEAT_INTERVAL=5000
WS_CONNECTION_TIMEOUT=30000

# 任务配置
MAX_ACTIVE_CONNECTIONS=5
TASK_RETRY_COUNT=3

# 安全配置
API_KEY=your-api-key-here

# 日志配置
LOG_LEVEL=info
```

### 2. 数据库配置

在 Supabase 中执行 `database.sql` 文件创建必要的表结构：

```bash
# 登录 Supabase 控制台
# 进入 SQL Editor
# 复制并执行 database.sql 中的 SQL 语句
```

### 3. 安装依赖

```bash
npm install
```

### 4. 启动服务

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

## API 文档

### 令牌管理

- `GET /api/tokens` - 获取所有令牌
- `GET /api/tokens/:id` - 获取单个令牌
- `POST /api/tokens` - 创建令牌
- `PUT /api/tokens/:id` - 更新令牌
- `DELETE /api/tokens/:id` - 删除令牌
- `GET /api/tokens/active/list` - 获取激活的令牌

### 任务管理

- `GET /api/tasks` - 获取所有任务
- `GET /api/tasks/:id` - 获取单个任务
- `POST /api/tasks` - 创建任务
- `PUT /api/tasks/:id` - 更新任务
- `DELETE /api/tasks/:id` - 删除任务
- `POST /api/tasks/:id/run` - 立即执行任务
- `GET /api/tasks/:id/next-execution` - 获取任务的下次执行时间

### 健康检查

- `GET /health` - 检查服务健康状态

## 部署到 Render

1. 登录 Render 平台
2. 点击 "New" -> "Web Service"
3. 选择你的 GitHub 仓库
4. 配置部署参数：
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: 填写与 `.env` 文件相同的配置
5. 点击 "Create Web Service"

## 前端配置

在前端项目中，修改 `.env` 文件：

```bash
# 后端 API 配置
VITE_BACKEND_URL=https://your-render-app.onrender.com
VITE_USE_BACKEND=true
```

## 项目结构

```
backend/
├── src/
│   ├── api/           # API 路由
│   ├── config/        # 配置文件
│   ├── services/      # 核心服务
│   └── utils/         # 工具函数
├── .env.example       # 环境变量示例
├── database.sql       # 数据库表结构
├── package.json       # 项目依赖
├── README.md          # 项目文档
├── render.yaml        # Render 部署配置
└── server.js          # 服务器入口
```

## 注意事项

1. **令牌安全**：请勿将游戏令牌暴露给他人
2. **连接限制**：避免同时建立过多 WebSocket 连接
3. **任务调度**：合理设置任务执行时间，避免频繁操作
4. **错误处理**：定期检查任务执行状态和错误日志

## 故障排查

- **WebSocket 连接失败**：检查令牌是否有效，网络连接是否正常
- **任务执行失败**：查看任务执行记录，检查错误信息
- **API 调用失败**：检查请求参数是否正确，服务是否正常运行

## 许可证

CC-BY-NC-SA-4.0
