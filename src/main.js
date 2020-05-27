/* 
 入口js
*/

import Vue from 'vue'
import App from './App'
import router from './router'
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'
import store from '@/store'
import '@/mock/mockServer' //加载mock接口主模块
import 'swiper/css/swiper.min.css' //* 引入swiper样式

Vue.component("TypeNav", TypeNav)
Vue.component("Carousel", Carousel)
Vue.component("Pagination", Pagination)

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  el: '#app',
  router,
  store,
  render: h => h(App)
})