import axios from 'axios';
// import qs from 'qs';
import { Toast } from 'vant';

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // do something
    Toast.loading({
      message: '加载中',
      forbidClick: true
    });
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      Toast.clear();
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    return Promise.resolve(error.response);
  }
);

// axios.defaults.baseURL = 'http://www.yingjiechen.cn:3334/api';
axios.defaults.baseURL = 'http://127.0.0.1:3333/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.timeout = 10000;

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params, config) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, config)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
