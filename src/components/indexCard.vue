<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="flex justify-between">
          <span class="text-sm">{{ title }}</span>
          <el-tag type="danger">{{ tip }}</el-tag>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col
          :span="6"
          :offset="0"
          class="border-0"
          v-for="(item, index) in btns"
          :key="index"
        >
          <el-card shadow="hover" class="bg-light-400">
            <div class="flex flex-col items-center justify-center">
              <span class="text-xl mb-2">{{ item.value }}</span>
              <span class="text-xs text-gray-500">{{ item.label }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  tip: String,
  btns: Array,
});
</script>
<style scoped></style>
