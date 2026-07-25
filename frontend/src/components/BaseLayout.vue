<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- 布局容器，采用大圆角和亮色风格契合儿童产品调性 -->
    <div class="bg-white rounded-2xl shadow-sm p-4 min-h-[80vh]">
      <h2 v-if="title" class="text-xl font-bold text-primary mb-4 border-l-4 border-secondary pl-2">
        {{ title }}
      </h2>
      <slot />
    </div>
  </div>
</template>
