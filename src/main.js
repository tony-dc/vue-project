import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Header from '@/components/Header'
import TabBar from "@/components/TabBar"
import VueLazyload from 'vue-lazyload'
//引入无限加载插件
import InfiniteLoading from 'vue-infinite-loading'
import infiniteScroll from 'vue-infinite-scroll'
import storage from 'store'
import api from '@/api'
//将api请求挂载到vue原型上，方便全局使用
Vue.prototype.$api = api
    //公共组件挂载到全局中
    //定义一个全局的过滤器用来处理图片
Vue.filter('setWH', (url, data) => {
    // 用字符串替换方法，正则匹配替换数据
    return url.replace(/w\.h/, data)
})
Vue.use(InfiniteLoading, {
    slots: {
        noMore: '我也是有底线的'
    }
})
Vue.use(VueLazyload,{
    loading:require('./assets/placeholder.png')
})
Vue.use(infiniteScroll)
    //让better-scroll成为全局组件，方便调用
import BScroll from '@/components/scroll/BScroll'
Vue.component('BScroll', BScroll)
Vue.component('Header', Header)
Vue.component('TabBar', TabBar)
//本地存储storage
Vue.prototype.$storage = storage
Vue.config.productionTip = false
new Vue({
    router,
    store,
    directives: {
        infiniteScroll
    },
    render: h => h(App)
}).$mount('#app')