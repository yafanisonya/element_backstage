import axios from "axios";
import store from "@/store";

const request = axios.create({
  // baseURL,
  // timeout
});

// 请求拦截器
request.interceptors.request.use(function (config) {
  console.log("接口请求进入 ===>>>", config);

  const { user } = store.state;
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default request;
