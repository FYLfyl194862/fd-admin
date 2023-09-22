import axios from "~/axios";
//获取图库列表
export function getImageList() {
  return axios.get(`/admin/image_class/:page?limit=10`);
}
