<template>
  <div>
    <el-tabs v-model="searchForm.tab" @tab-change="getData">
      <el-tab-pane
        v-for="(item, index) in tabbars"
        :key="index"
        :label="item.name"
        :name="item.key"
      ></el-tab-pane>
    </el-tabs>
    <el-card shadow="never" class="border-0">
      <el-form :model="searchForm" class="mb-3" label-width="80px" size="small">
        <el-row :gutter="20">
          <el-col :span="8" :offset="0">
            <el-form-item label="商品名称">
              <el-input
                v-model="searchForm.title"
                placeholder="商品名称"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0">
            <el-form-item label="商品分类" prop="category_id">
              <el-select
                v-model="searchForm.category_id"
                placeholder="请选择商品分类"
                clearable
              >
                <el-option
                  v-for="item in category_list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="8">
            <div class="flex justify-end items-center">
              <el-button type="primary" size="small" @click="getData"
                >搜索</el-button
              >
              <el-button size="small" @click="resetSearchForm">重置</el-button>
              <el-button type="primary" text>
                <el-icon><ArrowUp /> <ArrowDown /></el-icon>
              </el-button>
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
      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
        style="width: 100%"
      >
        <el-table-column label="商品" align="center" width="300">
          <template #default="{ row }">
            <div class="flex">
              <el-image
                :src="row.cover"
                fit="cover"
                :lazy="true"
                class="mr-3 rounded"
                style="width: 50px; height: 50px"
              ></el-image>
              <div class="flex-1">
                <p>{{ row.title }}</p>
                <div>
                  <span class="text-rose-500">¥{{ row.min_price }}</span>
                  <el-divider direction="vertical" />
                  <span class="text-gray-500 text-xs">{{
                    row.min_oprice
                  }}</span>
                </div>
                <div>
                  <p class="text-gray-400 text-xs mb-1">
                    分类:{{ row.category ? row.category.name : "未分类" }}
                  </p>
                  <p class="text-gray-400 text-xs">
                    创建时间{{ row.create_time }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="实际销量"
          align="center"
          width="70"
          prop="sale_count"
        />
        <el-table-column label="商品状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status ? 'sucess' : 'danger'" size="small">{{
              row.status ? "上架" : "仓库"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="审核状态"
          width="120"
          align="center"
          v-if="searchForm.tab != 'delete'"
        >
          <template #default="{ row }">
            <div v-if="row.ischeck == 0" class="flex flex-col">
              <el-button type="sucess" size="small" plain>审核通过</el-button>
              <el-button type="danger" size="small" plain class="mt-2 !ml-0"
                >审核拒绝</el-button
              >
            </div>
            <span v-else>{{ row.ischeck == 1 ? "通过" : "拒绝" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="总库存"
          align="center"
          width="90"
          prop="stock"
        />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <div v-if="searchForm.tab != 'delete'">
              <el-button
                size="small"
                @click="handleEdit(scope.row)"
                text
                class="px-1"
                >修改</el-button
              >
              <el-button size="small" text class="px-1">商品规格</el-button>
              <el-button size="small" text class="px-1">设置轮播图</el-button>
              <el-button size="small" text class="px-1">商品详情</el-button>
              <el-popconfirm
                title="确认要删除该商品?"
                confirmButtonText="确认"
                cancelButtonText="取消"
                @confirm="handleDelete(scope.row.id)"
              >
                <template #reference>
                  <el-button text size="small" type="primary" class="px-1"
                    >删除</el-button
                  >
                </template>
              </el-popconfirm>
            </div>
            <span v-else>暂无操作</span>
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
      <FormDrawer
        ref="formDrawerRef"
        @submit="handleSubmit"
        :title="drawerTitle"
      >
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
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import {
  getGoodsList,
  updateGoodsStatus,
  deleteGoods,
  updateGoods,
  createGoods,
} from "~/api/goods.js";
import { getCategoryList } from "~/api/category.js";
import { toast } from "~/composables/util.js";
import FormDrawer from "~/components/FormDrawer.vue";
const searchForm = reactive({
  title: "",
  tab: "",
  category_id: null,
});
const form = reactive({
  username: "",
  password: "",
  role_id: null,
  status: 1,
  avatar: "",
});

const roles = ref([]);
const tableData = ref([]);
const loading = ref(false);
const total = ref(0);
const limit = ref(10);
const currentPage = ref(1);
const formDrawerRef = ref(null);
const formRef = ref(null);
//获取列表
function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getGoodsList(currentPage.value, searchForm)
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
//重置表单
const resetSearchForm = () => {
  searchForm.title = "";
  getData();
};
//修改状态
const handleStatusChange = (status, row) => {
  row.statusLoading = true;
  updateGoodsStatus(row.id, status)
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
//提交
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return;
    formDrawerRef.value.showLoading();
    const fun = editId.value
      ? updateGoods(editId.value, form)
      : createGoods(form);
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
  deleteGoods(id)
    .then((res) => {
      toast("删除成功");
      getData();
    })
    .finally(() => {
      loading.value = false;
    });
};
//订单类型：all全部，checking审核中，saling出售中，off已下架，min_stock库存预警，delete回收站
const tabbars = [
  {
    key: "all",
    name: "全部",
  },
  {
    key: "checking",
    name: "审核中",
  },
  {
    key: "saling",
    name: "出售中",
  },
  {
    key: "off",
    name: "已下架",
  },
  {
    key: "delete",
    name: "回收站",
  },
];
//商品分类
const category_list = ref([]);
getCategoryList().then((res) => {
  category_list.value = res;
});
//展开收起
// const showSearch = ref(false);
</script>
<style scoped></style>
