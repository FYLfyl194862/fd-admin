<template>
  <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="demo-tabs"
      style="min-width: 100px"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
    <span class="tag-btn">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
</template>
<script setup>
import { ref } from "vue";

let tabIndex = 2;
const editableTabsValue = ref("2");
const editableTabs = ref([
  {
    title: "Tab 1",
    name: "1",
    content: "Tab 1 content",
  },
  {
    title: "Tab 2",
    name: "2",
    content: "Tab 2 content",
  },
  {
    title: "Tab 2",
    name: "3",
    content: "Tab 2 content",
  },
  {
    title: "Tab 2",
    name: "4",
    content: "Tab 2 content",
  },
  {
    title: "Tab 2",
    name: "2",
    content: "Tab 2 content",
  },
  {
    title: "Tab 2",
    name: "2",
    content: "Tab 2 content",
  },
  {
    title: "Tab 2",
    name: "2",
    content: "Tab 2 content",
  },
  {
    title: "Tab 2",
    name: "2",
    content: "Tab 2 content",
  },
  {
    title: "Tab 2",
    name: "2",
    content: "Tab 2 content",
  },
  {
    title: "Tab 2",
    name: "2",
    content: "Tab 2 content",
  },
  {
    title: "Tab 1",
    name: "1",
    content: "Tab 1 content",
  },
  {
    title: "Tab 2",
    name: "2",
    content: "Tab 2 content",
  },
  {
    title: "Tab 2",
    name: "3",
    content: "Tab 2 content",
  },
  {
    title: "Tab 2",
    name: "4",
    content: "Tab 2 content",
  },
  {
    title: "Tab 1",
    name: "1",
    content: "Tab 1 content",
  },
  {
    title: "Tab 2",
    name: "2",
    content: "Tab 2 content",
  },
  {
    title: "Tab 2",
    name: "3",
    content: "Tab 2 content",
  },
  {
    title: "Tab 2",
    name: "4",
    content: "Tab 2 content",
  },
]);

const addTab = (targetName) => {
  const newTabName = `${++tabIndex}`;
  editableTabs.value.push({
    title: "New Tab",
    name: newTabName,
    content: "New Tab content",
  });
  editableTabsValue.value = newTabName;
};
const removeTab = (targetName) => {
  const tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
        }
      }
    });
  }

  editableTabsValue.value = activeName;
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
};
</script>
<style scoped>
.f-tag-list {
  position: fixed;
  top: 64px;
  right: 0;
  height: 44px;
  display: flex;
  background-color: #f3f4f6;
  align-items: center;
  z-index: 100;
}
.tag-btn {
  background-color: white;
  height: 32px;
  width: 32px;
  border-radius: 0.25rem;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
:deep(.el-tabs__header) {
  margin-bottom: 0;
}
:deep(.el-tabs__nav) {
  border: 0 !important;
}
:deep(.el-tabs__item) {
  border: 0 !important;
  height: 32px;
  background-color: white;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  line-height: 32px;
  border-radius: 0.25rem;
}
:deep(.is-disabled) {
  background-color: #d1d5db;
  cursor: not-allowed;
}
</style>
