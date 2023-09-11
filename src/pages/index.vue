<template>
  <el-button @click="handleLogout">退出登录</el-button>
</template>
<script setup>
// import { useRouter } from "vue-router";
// import { logout } from "~/api/manager";
// import { showModel, toast } from "~/composables/util";
// import { useStore } from "vuex";
// const router = useRouter();
// const store = useStore();
// function handleLogout() {
//   showModel("是否要退出登录")
//     .then((res) => {
//       logout
//         .finally((res) => {
//           //移除cookie里面的token
//           //清楚当前用户状态vuex
//           store.dispatch("logout");
//           //跳转会登录页
//           router.push("/login");
//           //提示退出登陆成功
//           toast("退出登陆成功");
//         })
//         .catch((error) => {});
//     })
//     .catch((error) => {});
// }
</script>
<style></style>
