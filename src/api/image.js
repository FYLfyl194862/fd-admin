import axios from "~/axios";
//获取图库列表
export function getImageList(page) {
  return axios.get(`/admin/image_class/` + page);
}

export function createImageClass(data) {
  return axios.post(`/admin/image_class`, data);
}

export function updateImageClass(id, data) {
  return axios.post(`/admin/image_class/` + id, data);
}
