import { useCookies } from "@vueuse/integrations/useCookies";
//admin-token统一为TokenKey
const TokenKey = "admin-token";
//创建cookie实例
const cookie = useCookies();
// 获取token 方法通过export导出去
export function getToken() {
  return cookie.get(TokenKey);
}

// 设置token
export function setToken(token) {
  return cookie.set(TokenKey, token);
}

// 清除token
export function removeToken() {
  return cookie.remove(TokenKey);
}
