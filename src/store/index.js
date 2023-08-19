import { createStore } from "vuex";
import { login, getinfo } from "~/api/manager";
// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      //用户信息
      user: {},
    };
  },
  mutations: {
    //记录用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    },
  },
  actions: {
    getinfo,
  },
});
export default store;