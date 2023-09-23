<template>
  <el-card shadow="never" class="border-0">
    <div class="flex justify-between items-center mb-4">
      <el-button type="primary" size="small" @click="handleCreate"
        >新增</el-button
      >
      <el-tooltip effect="dark" content="刷新数据" placement="top">
        <el-button text
          ><el-icon @click="getData" :size="20"><Refresh /></el-icon
        ></el-button>
      </el-tooltip>
    </div>
    <!-- 表格栏 -->
    <el-table :data="tableData" fit>
      <el-table-column prop="title" label="公告标题" />
      <el-table-column prop="create_time" label="公告时间" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            text
            @click="handleEdit(scope.row)"
            >修改</el-button
          >
          <el-popconfirm
            title="确认要删除该公告?"
            confirmButtonText="确认"
            cancelButtonText="取消"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button size="small" type="primary" text>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页栏 -->
    <div class="flex justify-center items-center mt-5">
      <el-pagination
        v-model:current-page="currentPage"
        background
        layout="prev, pager, next"
        :total="total"
        v-model:page-size="limit"
      />
    </div>
    <FormDrawer
      ref="formDrawerRef"
      :title="drawerTitle"
      @submit="handleSubmit"
      :inline="false"
    >
      <el-form ref="formRef" :rules="rules" :model="form">
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title" placeholder="公告标题" />
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input v-model="form.content" placeholder="公告内容" />
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import {
  getNoticeList,
  createNotice,
  deleteNotice,
  updateNotice,
} from "~/api/notice.js";
import FormDrawer from "~/components/FormDrawer.vue";
import { toast } from "~/composables/util.js";
const tableData = ref([]);
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);
const formDrawerRef = ref(null);
const formRef = ref(null);
const editId = ref(0);
const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));
const loading = ref(false);
const form = reactive({
  title: "",
  content: "",
});
const rules = {
  title: [
    {
      required: true,
      message: "公告标题不能为空",
      trigger: "blur",
    },
  ],
  content: [
    {
      required: true,
      message: "公告内容不能为空",
      trigger: "blur",
    },
  ],
};
function getData(p = null) {
  if (p == "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getNoticeList(currentPage.value)
    .then((res) => {
      // console.log(res);
      tableData.value = res.list;
      total.value = res.totalCount;
    })
    .finally(() => {
      loading.value = false;
    });
}
getData();
//重置表单
function resetForm(row = false) {
  if (formRef.value) formRef.value.clearValidate;
  if (row) {
    for (const key in form) {
      form[key] = row[key];
    }
  }
}
//新增
const handleCreate = () => {
  editId.value = 0;
  resetForm({
    title: "",
    content: "",
  });
  formDrawerRef.value.open();
};
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return;
    formDrawerRef.value.showLoading();
    const fun = editId.value
      ? updateNotice(editId.value, form)
      : createNotice(form);
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
//删除
const handleDelete = (id) => {
  loading.value = true;
  deleteNotice(id)
    .then((res) => {
      toast("删除成功");
      getData();
    })
    .finally(() => {
      loading.value = false;
    });
};
//修改
const handleEdit = (row) => {
  editId.value = row.id;
  resetForm(row);
  formDrawerRef.value.open();
};
</script>
<style scoped></style>
