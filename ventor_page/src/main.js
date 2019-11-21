// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import BaiduMap from 'vue-baidu-map'
import axios from 'axios'
import qs from 'qs'
import store from '@/vuex/store'
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000/api'
axios.interceptors.request.use(function (config) {
  // 所有请求之前都要执行的操作
  // console.log('axios 的请求拦截器', config)
  // 如果是login，不添加header
  if (config.url.indexOf('login') <= -1) {
    // 给请求头中添加 Authorization 请求头：
    config.headers.Authorization = store.state.token
  }

  return config
})

// axios.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   return response;
// }, function (error) {
//   // 对响应错误做点什么
//   if (error.response.status === 401) {
//       const data = {
//           code: -1,
//           message: '登录超时'
//       }
//       return Promise.reject(data)
//   }
//   return Promise.reject(error);
// });

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'fIfBIZNRnEj1A8G8nNWFqM3F9w09ny3B'
})
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
