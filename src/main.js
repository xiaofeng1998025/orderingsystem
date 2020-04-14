import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import {post,fetch} from './plugins/http'
import api from "./plugins/api";
import qs from 'qs';
import echarts from 'echarts'
Vue.config.productionTip = false;
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$api=api;
Vue.prototype.$qs=qs;
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
