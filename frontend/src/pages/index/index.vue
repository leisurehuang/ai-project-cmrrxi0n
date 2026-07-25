<script setup lang="ts">
// 首页主要用于跳转到示例模块验证前后端联通
const goToTasks = () => {
  uni.navigateTo({ url: '/pages/tasks/index' });
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-50">
    <h1 class="text-2xl font-bold text-primary mb-8">儿童习惯养成</h1>
    <button 
      class="bg-primary text-white font-bold py-2 px-6 rounded-full shadow-md active:bg-primary-dark"
      @tap="goToTasks"
    >
      查看任务列表(联通测试)
    </button>
  </div>
</template>
