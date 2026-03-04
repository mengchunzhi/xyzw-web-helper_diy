import dotenv from 'dotenv';
import app from './src/app.js';
import TaskService from './src/services/TaskService.js';

// 加载环境变量
dotenv.config();

// 将 TaskService 设置为全局变量，供健康检查接口使用
global.taskService = TaskService;

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`环境: ${process.env.NODE_ENV || 'development'}`);
});
