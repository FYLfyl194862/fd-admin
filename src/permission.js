import { getToken } from "~/composables/auth";
import { toast, showFullLoading, hideFullLoading } from "~/composables/util";
import { router, addRoutes } from "~/router";
import store from "./store";

// 全局前置守卫
let hasGetInfo = false;
router.beforeEach(async (to, from, next) => {
  //显示loading
  showFullLoading();
  //console.log("全局前置守卫");
  const token = getToken(); //to表示即将要到达的地址，from从哪一个路径来
  if (!token && to.path != "/login") {
    toast("请先登录", "error");
    return next({ path: "/login" }); // 没有登录，强制跳转回登录页
  }
  // 防止重复登录 from.path从哪里来的路径，或者强制回到登录页
  if (token && to.path == "/login") {
    toast("请勿重复登录", "error");
    return next({ path: from.path ? from.path : "/" });
  }
  //如果用户登陆了，自动获取用户信息，并存储在vuex 异步操作前面加await
  let hasNewRoutes = false;
  if (token && !hasGetInfo) {
    let { menus } = await store.dispatch("getinfo");
    hasGetInfo = true;
    hasNewRoutes = addRoutes(menus);
  }
  //设置页面标题
  let title = (to.meta.title ? to.meta.title : "") + "-后台管理系统";
  document.title = title;
  // console.log(to.meta.title);
  hasNewRoutes ? next(to.fullpath) : next();
});
//全局后置守卫 页面渲染完毕就会关闭login状态
router.afterEach((to, from) => {
  hideFullLoading();
});
// getinfo().then((res) => {
//   commit("SET_USERINFO", res);
// });
