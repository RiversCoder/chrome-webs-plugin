import Vue from 'vue'
import App from './App'
import store from '../store'
import axios from 'axios'
import router from './router'
import ElementUI from 'element-ui';
import '@/css/index.css';


Vue.use(ElementUI);
Vue.prototype.axios = axios
Vue.prototype.bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

axios.interceptors.request.use(function (config) {
  config.headers.common['system'] = 'S11SU01'
  if (store.state.hasToken.length > 0) {
    config.headers.common['token'] = store.state.hasToken;
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});