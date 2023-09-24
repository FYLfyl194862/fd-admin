<template>
  <el-card shadow="never" class="border-0">
    <el-form :model="searchForm" class="mb-3" label-width="80px" size="small">
      <el-row :gutter="20">
        <el-col :span="8" :offset="0">
          <el-form-item label="商品名称">
            <el-input
              v-model="searchForm.keyword"
              placeholder="商品名称"
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
      <el-button type="primary" size="small" @click="handleCreate"
        >新增</el-button
      >
      <el-button type="danger" size="small" @click="handleCreate"
        >批量删除</el-button
      >
      <el-button size="small" @click="handleCreate">上架</el-button>
      <el-button size="small" @click="handleCreate">下架</el-button>
      <el-tooltip
        effect="dark"
        content="刷新数据"
        placement="top"
        @click="getData"
      >
        <el-button text
          ><el-icon><Refresh /></el-icon
        ></el-button>
      </el-tooltip>
    </div>
    <!-- 表格栏 -->
    <el-table :data="tableData">
      <el-table-column label="管理员" align="center" width="200">
        <template #default="{ row }">
          <div class="flex items-center">
            <el-avatar :size="40" :src="row.avatar">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
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
            :loading="row.statusLoading"
            :modelValue="row.status"
            :active-value="1"
            :inactive-value="0"
            :disabled="row.super == 1"
            @change="handleStatusChange($event, row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="360">
        <template #default="scope">
          <small class="text-sm text-gray-500" v-if="scope.row.super == 1"
            >暂无操作</small
          >
          <div v-else>
            <el-button size="small" @click="handleEdit(scope.row)" text
              >修改</el-button
            >
            <el-popconfirm
              title="确认要删除该管理员?"
              confirmButtonText="确认"
              cancelButtonText="取消"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button text size="small" type="primary">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页栏 -->
    <div class="flex items-center justify-center mt-5">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="limit"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="getData"
      />
    </div>
    <FormDrawer ref="formDrawerRef" @submit="handleSubmit" :title="drawerTitle">
      <el-form :model="form" label-width="60px" ref="formRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="所属角色" prop="role_id">
          <el-select
            v-model="form.role_id"
            value-key=""
            placeholder="选择所属角色"
            clearable
            filterable
            @change=""
          >
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import {
  getManagerList,
  updateManagerStatus,
  deleteManager,
  updateManager,
  createManager,
} from "~/api/manager.js";
import { toast } from "~/composables/util.js";
import FormDrawer from "~/components/FormDrawer.vue";
const searchForm = reactive({
  keyword: "",
});
const form = reactive({
  username: "",
  password: "",
  role_id: null,
  status: 1,
  avatar: "",
});
//重置表单
const resetSearchForm = () => {
  searchForm.keyword = "";
  getData();
};
const roles = ref([]);
const tableData = ref([]);
const loading = ref(false);
const total = ref(0);
const limit = ref(10);
const currentPage = ref(1);
const formDrawerRef = ref(null);
const formRef = ref(null);
function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getManagerList(currentPage.value, searchForm)
    .then((res) => {
      console.log(res);
      tableData.value = res.list.map((o) => {
        o.statusLoading = false;
        return o;
      });
      total.value = res.totalCount;
      roles.value = res.roles;
    })
    .finally(() => {
      loading.value = false;
    });
}
getData();
//修改状态
const handleStatusChange = (status, row) => {
  row.statusLoading = true;
  updateManagerStatus(row.id, status)
    .then((res) => {
      toast("修改状态成功");
      getData();
      formDrawerRef.value.close();
    })
    .finally(() => {
      row.statusLoading = false;
    });
};
const editId = ref(0);
const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));
//新增
const handleCreate = () => {
  editId.value = 0;
  resetForm({
    username: "",
    password: "",
    role_id: null,
    status: 1,
    avatar: "",
  });
  formDrawerRef.value.open();
};
//重置表单
function resetForm(row = false) {
  if (formRef.value) formRef.value.clearValidate;
  if (row) {
    for (const key in form) {
      form[key] = row[key];
    }
  }
}
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return;
    formDrawerRef.value.showLoading();
    const fun = editId.value
      ? updateManager(editId.value, form)
      : createManager(form);
    fun
      .then((res) => {
        toast(drawerTitle.value + "成功");
        getData();
      })
      .finally(() => {
        formDrawerRef.value.hideLoading();
      });
  });
};
//修改
const handleEdit = (row) => {
  editId.value = row.id;
  resetForm(row);
  formDrawerRef.value.open();
};
//删除
const handleDelete = (id) => {
  loading.value = true;
  deleteManager(id)
    .then((res) => {
      toast("删除成功");
      getData();
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
<style scoped></style>
