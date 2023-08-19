import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import ElementPlus, { buttonEmits } from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import VueI18n from "./i18n/index";
import store from "./store";
//引入windicss库
import "virtual:windi.css";
import "nprogress/nprogress.css";

const app = createApp(App);
app.use(store);
app.use(router);
//引入Elementplus
app.use(ElementPlus);
app.use(VueI18n);
import "./permission";
app.mount("#app");
