import Vue from 'vue'
import App from './App.vue'

//引入vuex仓库
import store from "./store/index";

//引入全局组件
//三级导航
import TypeNav from './components/TypeNav/TypeNav'
//轮播图
import Carousel from './components/Carousel'
//分页器
import Pagination from './components/Pagination/Pagination'
// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Pagination',Pagination)
Vue.component('TypeNav',TypeNav)
// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Carousel',Carousel)

//引入路由配置文件
import router from './router/index'
Vue.config.productionTip = false

//引入mockServer
import './mock/mockServe'

//引入swiper轮播图的css样式
import 'swiper/css/swiper.css'

//图片懒加载
import VueLazyload from 'vue-lazyload'
import img from '@/assets/The_Bowl.jpg'
Vue.use(VueLazyload,
    {
      loading: img
    })

//引入使用elmul
import { Button,MessageBox } from 'element-ui'
//注册全局组件
Vue.use(Button)
//另一种写法，直接挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入API
import * as API from '@/api'

new Vue({
  render: h => h(App),
  //开启全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由,组件身上会多出$route和$router属性
  router,
  //注册仓库，组件身上会多出$store属性
  store
}).$mount('#app')
