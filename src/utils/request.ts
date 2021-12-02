import axios from "axios";
import store from "@/store";
import { Message } from "element-ui";
import router from "@/router";
import qs from "qs";

const request = axios.create({
  // baseURL,
  // timeout
});

function redirectLogin () {
  router.push({
    name: "login",
    query: {
      redirect: router.currentRoute.fullPath,
    },
  });
}

function refreshToken () {
  return axios.create()({
    method: "POST",
    url: "/front/user/refresh_token",
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token,
    }),
  });
}

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

// 响应拦截器
let isRfreshing = false;
let requests: any[] = [];
request.interceptors.response.use(function (response) {
  // 状态码 2xx
  // console.log("请求响应成功 =>", response);
  return response;
}, async function (error) {
  // 超出 2xx 状态码
  // console.dir(error);

  if (error.response) {
    const { status } = error.response;
    if (status === 400) {
      Message.error("请求参数错误");
    } else if (status === 401) {
      if (!store.state.user) {
        redirectLogin();
        return Promise.reject(error);
      }

      if (!isRfreshing) {
        isRfreshing = true;
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error("刷新 Token 失败");
          }
          store.commit("setUser", res.data.content);
          requests.forEach(cb => cb());
          requests = [];
          return request(error.config);
        }).catch(err => {
          console.log(err);
          store.commit("setUser", null);
          redirectLogin();
          return Promise.reject(error);
        }).finally(() => {
          isRfreshing = false;
        });
      }

      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config));
        });
      });
    } else if (status === 403) {
      Message.error("没有权限，请联系管理员");
    } else if (status === 404) {
      Message.error("请求资源不存在");
    } else if (status >= 500) {
      Message.error("服务端错误，请联系管理员");
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    Message.error("请求超时，请刷新重试");
  } else {
    // Something happened in setting up the request that triggered an Error
    Message.error(`请求失败：${error.message}`);
  }
  console.log(error.config);
  return Promise.reject(error);
},
);
export default request;
