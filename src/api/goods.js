import axios from "~/axios";
import { queryParams } from "~/composables/util";
//获取商品列表
export function getGoodsList(page, query = {}) {
  let r = queryParams(query);
  return axios.get(`/admin/goods/${page}${r}`);
}
//新增商品
export function createGoods(data) {
  return axios.post(`/admin/goods`, data);
}
//删除商品
export function deleteGoods(ids) {
  return axios.post(`/admin/goods/delete_all`, {
    ids,
  });
}
//修改商品
export function updateGoods(id, data) {
  return axios.post(`/admin/goods/${id}`, data);
}
//修改商品状态
export function updateGoodsStatus(ids, status) {
  return axios.post(`/admin/goods/changestatus`, {
    ids,
    status,
  });
}
