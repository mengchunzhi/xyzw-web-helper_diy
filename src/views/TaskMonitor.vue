<template>
  <div class="task-monitor">
    <h2 class="text-xl font-bold mb-4">定时任务监控</h2>

    <div class="grid gap-4 md:grid-cols-[2fr,3fr]">
      <!-- 任务列表 -->
      <div class="space-y-2">
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold">任务列表</span>
          <button
            class="px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
            @click="loadTasks"
          >
            刷新
          </button>
        </div>

        <div
          v-if="loadingTasks"
          class="text-sm text-gray-500"
        >
          正在加载任务...
        </div>

        <div
          v-else-if="tasks.length === 0"
          class="text-sm text-gray-500"
        >
          暂无任务，请先在日常任务页面创建。
        </div>

        <ul class="space-y-1 max-h-[360px] overflow-auto">
          <li
            v-for="task in tasks"
            :key="task.id"
            :class="[
              'px-3 py-2 rounded cursor-pointer text-sm flex justify-between items-center',
              selectedTaskId === task.id
                ? 'bg-blue-50 border border-blue-400'
                : 'bg-gray-50 hover:bg-gray-100 border border-transparent',
            ]"
            @click="selectTask(task.id)"
          >
            <div>
              <div class="font-medium">
                {{ task.name }}
                <span class="ml-2 text-xs text-gray-500">({{ task.type }})</span>
              </div>
              <div class="text-xs text-gray-500">
                {{ formatRunInfo(task) }}
              </div>
            </div>
            <span
              class="text-xs px-2 py-0.5 rounded"
              :class="task.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'"
            >
              {{ task.is_active ? '激活' : '停用' }}
            </span>
          </li>
        </ul>
      </div>

      <!-- 执行记录 -->
      <div class="space-y-2">
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold">
            执行记录
            <span v-if="selectedTask">
              （{{ selectedTask.name }}）
            </span>
          </span>
          <div class="flex items-center gap-2">
            <select
              v-model="filterStatus"
              class="border rounded px-2 py-1 text-xs"
            >
              <option value="">全部状态</option>
              <option value="running">运行中</option>
              <option value="completed">已完成</option>
              <option value="failed">失败</option>
            </select>
            <button
              class="px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
              :disabled="!selectedTaskId"
              @click="loadExecutions"
            >
              刷新记录
            </button>
          </div>
        </div>

        <div
          v-if="!selectedTaskId"
          class="text-sm text-gray-500"
        >
          请先在左侧选择一个任务。
        </div>

        <div
          v-else-if="loadingExecutions"
          class="text-sm text-gray-500"
        >
          正在加载执行记录...
        </div>

        <div
          v-else-if="executions.length === 0"
          class="text-sm text-gray-500"
        >
          暂无执行记录。
        </div>

        <div
          v-else
          class="border rounded bg-gray-50 max-h-[360px] overflow-auto text-xs"
        >
          <table class="min-w-full border-collapse">
            <thead class="bg-gray-100 sticky top-0">
              <tr>
                <th class="px-2 py-1 border text-left">时间</th>
                <th class="px-2 py-1 border text-left">账号</th>
                <th class="px-2 py-1 border text-left">状态</th>
                <th class="px-2 py-1 border text-left">耗时</th>
                <th class="px-2 py-1 border text-left">详情</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="exec in executions"
                :key="exec.id"
              >
                <td class="px-2 py-1 border whitespace-nowrap">
                  {{ formatTime(exec.started_at) }}
                </td>
                <td class="px-2 py-1 border">
                  {{ getTokenName(exec.token_id) }}
                </td>
                <td class="px-2 py-1 border">
                  <span
                    :class="[
                      'px-1.5 py-0.5 rounded',
                      exec.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : exec.status === 'failed'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700',
                    ]"
                  >
                    {{ exec.status }}
                  </span>
                </td>
                <td class="px-2 py-1 border whitespace-nowrap">
                  {{ formatDuration(exec.started_at, exec.completed_at) }}
                </td>
                <td class="px-2 py-1 border max-w-[260px]">
                  <div class="truncate">
                    {{ summarizeResult(exec.result) }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import ApiService from '@/services/apiService';
import { useTokenStore } from '@/stores/tokenStore';

const apiService = new ApiService();
const tokenStore = useTokenStore();

const tasks = ref([]);
const executions = ref([]);
const selectedTaskId = ref('');
const filterStatus = ref('');

const loadingTasks = ref(false);
const loadingExecutions = ref(false);

const selectedTask = computed(() =>
  tasks.value.find((t) => t.id === selectedTaskId.value) || null,
);

const loadTasks = async () => {
  loadingTasks.value = true;
  try {
    const res = await apiService.getTasks();
    if (res?.success && Array.isArray(res.data)) {
      tasks.value = res.data;
    } else {
      tasks.value = [];
      console.error('加载任务列表失败:', res?.error);
    }
  } finally {
    loadingTasks.value = false;
  }
};

const loadExecutions = async () => {
  if (!selectedTaskId.value) return;
  loadingExecutions.value = true;
  try {
    const params = {
      limit: 50,
    };
    if (filterStatus.value) {
      params.status = filterStatus.value;
    }
    const res = await apiService.getTaskExecutions(selectedTaskId.value, params);
    if (res?.success && Array.isArray(res.data)) {
      executions.value = res.data;
    } else {
      executions.value = [];
      console.error('加载任务执行记录失败:', res?.error);
    }
  } finally {
    loadingExecutions.value = false;
  }
};

const selectTask = (taskId) => {
  selectedTaskId.value = taskId;
  executions.value = [];
  loadExecutions();
};

const formatRunInfo = (task) => {
  if (task.run_type === 'daily') {
    return `每天 ${task.run_time || '00:00'}`;
  }
  return task.cron_expression || '';
};

const formatTime = (iso) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleString();
};

const formatDuration = (start, end) => {
  if (!start || !end) return '-';
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  if (!s || !e || e < s) return '-';
  const diff = Math.floor((e - s) / 1000);
  if (diff < 60) return `${diff}s`;
  const m = Math.floor(diff / 60);
  const sRem = diff % 60;
  return `${m}m${sRem}s`;
};

const getTokenName = (tokenId) => {
  if (!tokenId) return '-';
  const token = tokenStore.gameTokens.value?.find((t) => t.id === tokenId);
  return token?.name || tokenId;
};

const summarizeResult = (result) => {
  if (!result) return '';
  try {
    const steps = result.steps || [];
    const ok = result.status || '';
    if (steps.length > 0) {
      const failedCount = steps.filter((s) => s.status === 'failed').length;
      const successCount = steps.filter((s) => s.status === 'success').length;
      if (failedCount > 0) {
        return `步骤 ${successCount} 成功, ${failedCount} 失败`;
      }
      return `步骤 ${steps.length} 个, 状态: ${ok}`;
    }
    if (result.error) {
      return `错误: ${result.error}`;
    }
    return ok || JSON.stringify(result);
  } catch (e) {
    return '';
  }
};

onMounted(() => {
  loadTasks();
});
</script>

<style scoped>
.task-monitor {
  padding: 16px;
}
</style>

