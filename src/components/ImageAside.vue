<template>
  <el-aside width="200px" class="image-aside" v-loading="loading">
    <div class="top">
      <AsideList
        v-for="(item, index) in list"
        :key="index"
        :active="activeId == item.id"
        @edit="handleEdit(item)"
        >{{ item.name }}</AsideList
      >
      <AsideList active>分类标题</AsideList>
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="limit"
        :current-page="currentPage"
        @current-change="getData"
      />
    </div>
    <FormDrawer ref="formDrawerRef" @submit="handleSubmit" :title="drawerTitle">
      <el-form :model="form" ref="formRef" :rules="rules" :inline="false">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order" :min="0" :max="1000" :step="1">
          </el-input-number>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-aside>
</template>

<script setup>
import { reactive, ref, onBeforeMount, computed } from "vue";
import AsideList from "./AsideList.vue";
import {
  getImageList,
  createImageClass,
  updateImageClass,
} from "~/api/image.js";
import FormDrawer from "~/components/FormDrawer.vue";
import { toast } from "~/composables/util.js";
//加载动画
const loading = ref(false);
const list = ref([]);
const activeId = ref(0);
const total = ref(0);
const currentPage = ref(1);
const limit = ref(10);
const formDrawerRef = ref(null);
const formRef = ref(null);
const editId = ref(0); //0 false
const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));
const rules = {
  name: [
    {
      required: true,
      message: "图库分类名称不能为空",
      trigger: "blur",
    },
  ],
};
const form = reactive({
  name: "",
  order: 50,
});
/** 获取图库列表 **/
function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getImageList(currentPage.value)
    .then((res) => {
      // console.log(res);
      list.value = res.list;
      total.value = res.totalCount;
      let item = list.value[0];
      if (item) {
        activeId.value = item.id;
      }
    })
    .finally(() => {
      loading.value = false;
    });
}
getData();

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return;
    }
    formDrawerRef.value.showLoading();
    const fun = editId.value
      ? updateImageClass(editId.value, form)
      : createImageClass(form);
    fun
      .then((res) => {
        toast(drawerTitle.value + "成功");
        getData(editId.value ? currentPage.value : 1);
        formDrawerRef.value.close();
      })
      .finally(() => {
        formDrawerRef.value.hideLoading();
      });
  });
};
const handleCreate = () => {
  editId.value = 0;
  form.name = "";
  form.order = "50";
  formDrawerRef.value.open();
};
/** 修改图库分类 **/
const handleEdit = (row) => {
  // console.log(row);
  editId.value = row.id;
  form.name = row.name;
  form.order = row.order;
  formDrawerRef.value.open();
};
defineExpose({
  handleCreate,
});
</script>
<style scoped>
.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;
}
.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
</style>
