import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
//引入ElementPlus及其样式
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { router } from "./router";
import VueI18n from "./i18n/index";
import store from "./store";
//引入windicss库
import "virtual:windi.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
//引入全局进度条
import "nprogress/nprogress.css";

const app = createApp(App);
app.use(store);
//引入路由
app.use(router);
//引入所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
//引入Elementplus
app.use(ElementPlus);

app.use(VueI18n);

import "./permission";
app.mount("#app");
