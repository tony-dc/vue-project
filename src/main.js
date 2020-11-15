import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Header from '@/components/Header'
import TabBar from "@/components/TabBar"
//公共组件挂载到全局中
Vue.component('Header',Header)
Vue.component('TabBar',TabBar)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
