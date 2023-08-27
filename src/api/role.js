import axios from "~/axios";
//获取角色列表
export function getRoleList(page) {
  return axios.get(`/admin/role/${page}`);
}
//新增角色
export function createRole(data) {
  return axios.post("/admin/role", data);
}
//更新 修改
export function updateRole(id, data) {
  return axios.post("/admin/role/" + id, data);
}
//删除
export function deleteRole(id) {
  return axios.post(`/admin/role/${id}/delete`);
}
//状态
export function updateRoleStatus(id, status) {
  return axios.post(`/admin/role/${id}/update_status`, {
    status,
  });
}
