<template>
  <div class="aside-list" :class="{ active: true }">
    <span class="truncate"><slot /></span>
    <el-button
      size="small"
      type="primary"
      text
      class="ml-auto px-1"
      @click="$emit('edit')"
      ><el-icon :size="12"><Edit /></el-icon
    ></el-button>
    <el-button
      size="small"
      type="primary"
      text
      class="px-1"
      @click="$emit('delete')"
      ><el-icon :size="12"><CloseBold /></el-icon
    ></el-button>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
//暴露事件出去
defineExpose(["edit", "delete"]);
</script>
<style scoped>
.aside-list {
  border-bottom: 1px solid #f4f4f4;
  @apply flex items-center p-3 text-sm text-gray-600;
  cursor: pointer;
}
.aside-list:hover {
  @apply bg-blue-50;
}
</style>
