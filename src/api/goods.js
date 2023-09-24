import axios from "~/axios";
//获取管理员列表
export function getGoodsList(page, query = {}) {
  let q = [];
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`);
    }
  }
  let r = q.join("&");
  r = r ? "?" + r : "";

  return axios.get(`/admin/manager/${page}${r}`);
}
//新增管理员
export function createGoods(data) {
  return axios.post(`/admin/manager`, data);
}
//删除管理员
export function deleteGoods(id) {
  return axios.post(`/admin/manager/${id}/delete`);
}
//修改管理员
export function updateGoods(id, data) {
  return axios.post(`/admin/manager/${id}`, data);
}
//修改管理员状态
export function updateGoods(id, status) {
  return axios.post(`/admin/manager/${id}/update_status`, {
    status,
  });
}
