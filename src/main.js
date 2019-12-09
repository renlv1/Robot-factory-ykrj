import Vue from 'vue'
import App from './App.vue'
import 'babel-polyfill' // 兼容旧浏览器
import router from './router'
import axios from 'axios'
import fetch from './api/api'
import store from './store'
import {i18n} from './i18n/config'
import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel.js'

import {DatePicker} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(DatePicker);

Vue.prototype.$http = axios
Vue.prototype.$api = 'https://tu0n1c4r29.execute-api.ap-northeast-2.amazonaws.com/prod/'
Vue.prototype.$fetch = fetch

// 引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 这个样式必须引入

Vue.prototype.$AmazonCognitoIdentity = require('amazon-cognito-identity-js');

Vue.prototype.$poolData = {
  UserPoolId : 'ap-northeast-2_fl1FFGewV', // Your user pool id here
  ClientId : '5qehqd13vlsi7m8too4gafr9tb' // Your client id here
};
var userPool = new Vue.prototype.$AmazonCognitoIdentity.CognitoUserPool(Vue.prototype.$poolData);
var attributeList = [];

Vue.prototype.$fetch = fetch

// 时间戳转换
Vue.prototype.$changeDate = function (time, str = '-', type = 1) {
  function ifTime (value) { // 判断时间是否是个位数
    if (value < 10) {
      return '0' + value
    }
    return value
  }
  let newTime = new Date(time)
  let day = newTime.getDate()
  let month = newTime.getMonth() + 1
  let year = newTime.getFullYear()
  let hours = newTime.getHours()
  let min = newTime.getMinutes()
  let sec = newTime.getSeconds()
  switch (type) {
    case 1:
      return year + str + ifTime(month) + str + ifTime(day) + ' ' + ifTime(hours) + ':' + ifTime(min)
    case 2:
      return year + str + ifTime(month) + str + ifTime(day) + ' ' + ifTime(hours) + ':' + ifTime(min) + ':' + ifTime(sec)
    case 3:
      return year + str + ifTime(month) + str + ifTime(day)
  }
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

// 进度条
NProgress.configure({
  showSpinner: false,
  minimum: 0.6,
  easing: 'ease',
  speed: 200
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
  NProgress.done()
})
