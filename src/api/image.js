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

export function deleteImageClass(id) {
  return axios.post(`/admin/image_class/${id}/delete`);
}

export function getImageListById(id, page = 1) {
  // debugger;
  return axios.get(`/admin/image_class/${id}/image/${page}`);
}
/** 修改图片名称**/
export function updateImageName(id, name) {
  return axios.post(`/admin/image/${id}`, { name });
}

/** 删除图片**/
export function deleteImage(ids) {
  return axios.post(`/admin/image/delete_all`, { ids });
}

/** 上传图片**/
export const uploadImage = "/api/admin/image/upload";
