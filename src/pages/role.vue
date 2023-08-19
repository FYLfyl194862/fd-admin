<template>
  <el-card shadow="never" class="border-0">
    <!-- 新增|刷新 -->
    <div class="flex items-center justify-between mb-4">
      <el-button type="primary" size="small" @click="handleCreate"
        >新增</el-button
      >
      <el-tooltip effect="dark" content="刷新数据" placement="top">
        <el-button text>
          <el-icon :size="20" @click="getData()">
            <Refresh />
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>
    <!-- 表格栏 -->
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="desc" label="角色描述" width="380" />
      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <el-switch
            :modelValue="row.status"
            :active-value="1"
            :inactive-value="0"
            :loading="row.statusLoading"
            :disabled="row.super == 1"
            @change="handleStatusChange($event, row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            text
            @click="openSetRule(scope.row)"
            >配置权限</el-button
          >
          <el-button
            type="primary"
            size="small"
            text
            @click="handleEdit(scope.row)"
            >修改</el-button
          >
          <el-popconfirm
            width="220"
            confirm-button-text="确认"
            cancel-button-text="取消"
            title="是否要删除该角色?"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button text type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页栏 -->
    <div class="flxe items-center justify-center mt-5">
      <el-pagination
        background
        layout="prev,pager,next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
      />
    </div>
    <!-- 新增抽屉实现 -->
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.title" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input
            v-model="form.desc"
            placeholder="角色描述"
            type="textarea"
            :rows="5"
          ></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
    <!-- 权限配置 -->
    <FormDrawer ref="setRuleFormDrawerRef" @submit="handleSetRuleSubmit">
    </FormDrawer>
  </el-card>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { Refresh } from "@element-plus/icons-vue";
import FormDrawer from "~/components/FormDrawer.vue";
import { getRoleList, createRole, updateRole, deleteRole } from "~/api/role";
import { toast } from "~/composables/util";

const tableData = ref([]);
const loading = ref(false);

// 分页
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);

// 获取数据
function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p;
  }

  loading.value = true;
  getRoleList(currentPage.value)
    .then((res) => {
      tableData.value = res.list;
      total.value = res.totalCount;
    })
    .finally(() => {
      loading.value = false;
    });
}

getData();

// 删除
const handleDelete = (id) => {
  loading.value = true;
  deleteRole(id)
    .then((res) => {
      toast("删除成功");
      getData();
    })
    .finally(() => {
      loading.value = false;
    });
};

// 表单部分
const formDrawerRef = ref(null);
const formRef = ref(null);
const form = reactive({
  name: "",
  desc: "",
  status: 1,
});
const rules = {
  name: [
    {
      required: true,
      message: "角色名称不能为空",
      trigger: "blur",
    },
  ],
};
const editId = ref(0);
const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return;

    formDrawerRef.value.showLoading();

    const fun = editId.value
      ? updateRole(editId.value, form)
      : createRole(form);

    fun
      .then((res) => {
        toast(drawerTitle.value + "成功");
        // 修改刷新当前页，新增刷新第一页
        getData(editId.value ? false : 1);
        formDrawerRef.value.close();
      })
      .finally(() => {
        formDrawerRef.value.hideLoading();
      });
  });
};

// 重置表单
function resetForm(row = false) {
  if (formRef.value) formRef.value.clearValidate();
  if (row) {
    for (const key in form) {
      form[key] = row[key];
    }
  }
}

// 新增
const handleCreate = () => {
  editId.value = 0;
  resetForm({
    title: "",
    content: "",
  });
  formDrawerRef.value.open();
};

// 编辑
const handleEdit = (row) => {
  editId.value = row.id;
  resetForm(row);
  formDrawerRef.value.open();
};
//权限配置
const setRuleFormDrawerRef = ref(null);
const openSetRule = (row) => {
  setRuleFormDrawerRef.value.open();
};
const handleSetRuleSubmit = () => {};
</script>
<style></style>
