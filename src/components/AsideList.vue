<template>
  <div class="aside-list" :class="{ active: active }">
    <span class="truncate"><slot /></span>
    <el-button
      size="small"
      type="primary"
      text
      class="ml-auto px-1"
      @click.stop="$emit('edit')"
      ><el-icon :size="12"><Edit /></el-icon
    ></el-button>
    <el-popconfirm
      title="是否要删除该分类"
      confirmButtonText="确认"
      cancelButtonText="取消"
      @confirm="$emit('delete')"
    >
      <template #reference>
        <el-button size="small" type="primary" text class="px-1"
          ><el-icon :size="12"><CloseBold /></el-icon
        ></el-button>
      </template>
    </el-popconfirm>
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
