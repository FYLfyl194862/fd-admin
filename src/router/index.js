import { createRouter, createWebHashHistory } from "vue-router";
import Index from "~/pages/index.vue";
import NotFound from "~/pages/404.vue";
import Login from "~/pages/login.vue";
import Role from "~/pages/role.vue";
import list from "~/notice/list.vue";
const routes = [
  {
    path: "/", //后台首页
    component: Index,
  },
  // 捕获404 Not found 路由
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/role",
    component: Role,
  },
  {
    path: "/list",
    component: list,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
export default router;
