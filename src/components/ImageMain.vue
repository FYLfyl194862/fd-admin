<template>
  <el-main class="image-main">
    <div class="top p-3">
      <!-- <div v-for="(item, index) in list" :key="index">{{ item.url }}</div> -->
      <el-row :gutter="20">
        <el-col
          :span="6"
          :offset="0"
          v-for="(item, index) in list"
          :key="index"
        >
          <el-card
            shadow="hover"
            class="relative mb-3"
            :body-style="{ padding: '0px' }"
          >
            <el-image
              :src="item.url"
              fit="cover"
              class="w-full h-[150px]"
              style="width: 100%"
              :preview-src-list="[item.url]"
              :initial-index="0"
            ></el-image>
            <div class="image-title">{{ item.name }}</div>
            <div class="flex justify-center items-center p-2">
              <el-button
                size="small"
                @click="handlerereName(item)"
                text
                type="primary"
                >重命名</el-button
              >
              <el-popconfirm
                title="是否删除该图片"
                confirmButtonText="确认"
                cancelButtonText="取消"
                @confirm="handleDelete(item.id)"
              >
                <template #reference
                  ><el-button text type="primary" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </el-card>
        </el-col>
      </el-row>
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
  </el-main>
  <el-drawer title="上传图片" v-model="drawerRef"
    ><UploadFile :data="{ image_class_id }" @success="handleupLoadSuccess" />
  </el-drawer>
</template>

<script setup>
import { reactive, ref } from "vue";
import { getImageListById, updateImageName, deleteImage } from "~/api/image.js";
import { toast, showPrompt } from "~/composables/util.js";
import { ElMessage, ElMessageBox } from "element-plus";
import UploadFile from "./UploadFile.vue";
const total = ref(0);
const currentPage = ref(1);
const limit = ref(10);
const loading = ref(false);
const image_class_id = ref(0);
const list = ref([]);
const drawerRef = ref(false);
const openUploadFile = () => {
  drawerRef.value = true;
};
/** 获取图库列表 **/
function getData(p = null) {
  if (typeof p == "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getImageListById(image_class_id.value, currentPage.value)
    .then((res) => {
      console.log(res);
      total.value = res.totalCount;
      list.value = res.list;
    })
    .finally(() => {
      loading.value = false;
    });
}
// getData();
//根据分类ID重新加载图片列表
const loadData = (id) => {
  currentPage.value = 1;
  image_class_id.value = id;
  getData();
};
//删除
const handleDelete = (id) => {
  loading.value = true;
  deleteImage([id])
    .then((res) => {
      toast("删除成功");
      getData();
    })
    .finally(() => {
      loading.value = false;
    });
};
//重命名
const handlerereName = (item) => {
  showPrompt("重命名", item.name).then(({ value }) => {
    loading.value = true;
    updateImageName(item.id, value)
      .then((res) => {
        toast("修改成功");
        getData();
      })
      .finally(() => {
        loading.value = false;
      });
  });
};
const handleupLoadSuccess = () => {
  getData(1);
};
defineExpose({
  loadData,
  openUploadFile,
});
</script>
<style scoped>
.image-main {
  position: relative;
}
.image-main .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
.image-title {
  position: absolute;
  top: 122px;
  left: -1px;
  right: -1px;
  @apply text-sm truncate text-gray-50 bg-opacity-50 bg-gray-800 px-2 m-1;
}
</style>
