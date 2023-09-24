import axios from "~/axios";
//获取商品列表
export function getCategoryList() {
  return axios.get(`/admin/category`);
}
