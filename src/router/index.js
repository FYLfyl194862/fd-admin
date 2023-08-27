import { createRouter, createWebHashHistory } from "vue-router";
import Index from "~/pages/index.vue";
import NotFound from "~/pages/404.vue";
import Login from "~/pages/login.vue";
import Role from "~/pages/role.vue";
import list from "~/notice/list.vue";
import Admin from "~/layouts/admin.vue";
import manage from "~/pages/manage.vue";
const routes = [
  {
    path: "/", //后台首页
    component: Admin,
    //子路由下面
    children: [
      {
        path: "/", //后台首页
        component: Index,
        meta: { title: "后台首页" },
      },
    ],
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
    meta: { title: "登录页" },
  },
  {
    path: "/role",
    component: Role,
    meta: { title: "角色管理页" },
  },
  {
    path: "/list",
    component: list,
    meta: { title: "公告列表页" },
  },
  {
    path: "/manage",
    component: manage,
    meta: { title: "管理员界面" },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
export default router;
