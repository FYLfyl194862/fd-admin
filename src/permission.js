import { getToken } from "~/composables/auth";
import { toast, showFullLoading, hideFullLoading } from "~/composables/util";
import router from "~/router";
import store from "./store";
// import store from "./store";

// // 全局前置守卫
// let hasGetInfo = false;
router.beforeEach(async (to, from, next) => {
  //显示loading
  showFullLoading();
  //   console.log("全局前置守卫");
  const token = getToken();
  // 没有登录，强制跳转回登录页
  if (!token && to.path != "/login") {
    toast("请先登录", "error");
    return next({ path: "/login" });
  }
  // 防止重复登录
  if (token && to.path == "/login") {
    toast("请勿重复登录", "error");
    return next({ path: from.path ? from.path : "/" });
  }
  //如果用户登陆了，自动获取用户信息，并存储在vuex
  if (token) {
    await store.dispatch("getinfo");
  }
  next();
});
//全局后置守卫
router.afterEach((to, from) => {
  hideFullLoading();
});
// getinfo().then((res) => {
//   commit("SET_USERINFO", res);
// });
