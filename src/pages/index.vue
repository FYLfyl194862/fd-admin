<template>
  <div>
    后台首页
    {{ $store.state.user.username }}
    <el-button @click="handlelogout">退出登录</el-button>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// import { ElMessage, ElMessageBox } from "element-plus";
import { showModal, toast } from "~/composables/util";
import { logout } from "~/api/manager";
const router = useRouter();
const store = useStore();
function handlelogout() {
  showModal("是否要退出登录")
    .then((res) => {
      logout().finally(() => {
        //移除token
        store.dispatch("logout");
        //清除当前用户状态

        //跳转回登录页
        router.push("/login");
        //提示退出登录成功
        toast("退出登录成功");
      });
    })
    .catch();
}
</script>
<style></style>
