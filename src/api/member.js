import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) { 
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) { 
  console.log("access token을 주고 유저정보를 가져온다.")
  api.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  console.log("header에 token 설정 완료")
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["Authorization"] = sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await api.get(`/user/logout/${userid}`).then(success).catch(fail);
}

async function findPwd(userid, success, fail){
  await api.get(`/user/${userid}/password`).then(success).catch(fail);
}

async function changePwd(userid, success, fail){
  await api.put(`/user/${userid}/password`).then(success).catch(fail);
}

export { login, findById, tokenRegeneration, logout, findPwd, changePwd};