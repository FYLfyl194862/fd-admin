<template>
  <el-card shadow="never" class="border-0">
    <el-form :model="searchForm" class="mb-3" label-width="80px" size="small">
      <el-row :gutter="20">
        <el-col :span="8" :offset="0">
          <el-form-item label="关键词">
            <el-input
              v-model="searchForm.keyword"
              placeholder="管理员昵称"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
          <div class="flex justify-end items-center">
            <el-button type="primary" size="small" @click="getData"
              >搜索</el-button
            >
            <el-button size="small" @click="resetSearchForm">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="flex justify-between items-center mb-4">
      <el-button type="primary" size="small">新增</el-button>
      <el-tooltip effect="dark" content="刷新数据" placement="top">
        <el-button text
          ><el-icon><Refresh /></el-icon
        ></el-button>
      </el-tooltip>
    </div>
    <!-- 表格栏 -->
    <el-table :data="tableData">
      <el-table-column label="管理员" align="center">
        <template #default="{ row }">
          <div class="flex justify-center items-center">
            <el-avatar :size="40" :src="row.avatar" @error="errorHandler">
            </el-avatar>
            <div class="ml-3">
              <h6>{{ row.username }}</h6>
              <small>ID:{{ row.id }}</small>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="所属管理员" align="center">
        <template #default="{ row }">
          {{ row.role ? row.role.name : "" }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="{ row }">
          <el-switch
            :modelValue="row.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)" text
            >修改</el-button
          >
          <el-popconfirm title="确认要删除该管理员?">
            <template #reference>
              <el-button
                text
                size="small"
                type="danger"
                @click="handleDelete(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页栏 -->
    <el-pagination
      :currentPage="currentPage"
      :limit="limit"
      background
      layout="prev, pager, next"
      :total="total"
    />
  </el-card>
</template>

<script setup>
import { reactive, ref } from "vue";
import { getManagerList } from "~/api/manager.js";
const searchForm = reactive({
  keyword: "",
});
//重置表单
const resetSearchForm = () => {
  searchForm.keyword = "";
  getData();
};
const tableData = ref([]);
const total = ref(0);
const limit = ref(10);
const currentPage = ref(1);
function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p;
  }
  getManagerList(currentPage.value, searchForm).then((res) => {
    console.log(res);
    tableData.value = res.list;
    total.value = res.totalCount;
  });
}
getData();
</script>
<style scoped></style>
