<template>
  <div id="Table-container">
    <el-table
      :data="props.dataList"
      :border="props.border"
      v-loading="props.loading"
      highlight-current-row
      :element-loading-text="props.loadingText"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" v-if="props.multipeChoice" />
      <el-table-column
        v-for="(item, index) in props.headers"
        :prop="item.value"
        :key="index"
        :label="item.label"
        :width="item.width ? item.width : 'none'"
      >
        <template #default="{ row }">
          <el-switch
            v-model="row[item.value]"
            v-if="item.isSwitch"
            @change="handleSwitchChange(row[item.value])"
          >
            <el-popover
              placement="left"
              v-if="item.isPopover && row[item.value] === '外借'"
              :width="280"
              trigger="click"
              @before-enter="handleShowPopover(row)"
            >
              <template #reference>
                <el-button type="primary" link>{{ row[item.value] }}</el-button>
              </template>
              <el-descriptions :columns="1" border>
                <el-descriptions-item label="Address"> </el-descriptions-item>
              </el-descriptions>
            </el-popover>
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
const emit = defineEmits(["handleSelectionChange"]);
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: "加载中.......",
  },
  multipeChoice: {
    type: Boolean,
    default: false,
  },
  align: {
    type: String,
    default: "left",
  },
  border: {
    type: Boolean,
    default: false,
  },
});
</script>
<style scoped></style>
