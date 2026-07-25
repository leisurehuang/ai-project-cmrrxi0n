<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BaseLayout from '@/components/BaseLayout.vue';
import { getTasksApi, type TaskVo } from '@/api/tasks.api';

// 响应式状态
const tasks = ref<TaskVo[]>([]);
const loading = ref(false);

// 获取任务列表数据
const fetchTasks = async () => {
  loading.value = true;
  try {
    tasks.value = await getTasksApi();
  } catch (error) {
    console.error('获取任务失败:', error);
  } finally {
    loading.value = false;
  }
};

// 页面加载时触发
onMounted(() => {
  fetchTasks();
});
</script>

<template>
  <BaseLayout title="我的任务">
    <!-- 加载状态 -->
    <div v-if="loading" class="text-center text-gray-400 py-10">努力加载中...</div>
    
    <!-- 空状态 -->
    <div v-else-if="tasks.length === 0" class="text-center text-gray-400 py-10">
      还没有任务哦，快去让爸爸妈妈添加吧！
    </div>

    <!-- 任务列表 -->
    <div v-else class="space-y-3">
      <div 
        v-for="task in tasks" 
        :key="task.id" 
        class="flex items-center justify-between p-4 bg-gray-50 rounded-xl active:bg-gray-100 transition"
      >
        <div>
          <h3 class="font-bold text-gray-800 text-base">{{ task.title }}</h3>
          <p class="text-xs text-gray-500 mt-1">
            {{ task.frequency === 'DAILY' ? '每日任务' : '每周任务' }}
          </p>
        </div>
        <!-- 积分奖励展示 -->
        <div class="bg-secondary-light text-secondary-dark font-bold px-3 py-1 rounded-full text-sm">
          +{{ task.rewardPoints }} 积分
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
