import axios from "~/axios";
//后台首页统计1
export function getStatistics1() {
  return axios.get(`admin/statistics1`);
}
//后台首页统计3
export function getStatistics3(type) {
  return axios.get(`/admin/statistics3?type=` + type);
}
