import Vue from 'vue'
import echarts from 'echarts'
Vue.prototype.$echarts=echarts

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import App from './App'
import store from './store'
import router from './router'
import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel'

import '@/icons' // icon
import '@/styles/index.scss' // global css
import '@/permission' // permission control

import * as filters from './filters'
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
// import '../mock' // simulation data

Vue.use(ElementUI, { locale }, Blob, Export2Excel)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
