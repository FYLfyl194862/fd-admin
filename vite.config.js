import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
//node.js内置模块，处理路径相关
import path from "path";

export default defineConfig({
  //用~代替根路径src
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  //解决跨域问题 用/api代替域名
  server: {
    proxy: {
      "/api": {
        target: "http://ceshi13.dishait.cn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  plugins: [vue(), WindiCSS()],
});
