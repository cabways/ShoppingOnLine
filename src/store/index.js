import Vue from 'vue'
import vuex from 'vuex'

//引入小仓库
import home from './home'
import search from "./search";
import detail from "./Detail";
import shopCart from "@/store/shopCart";
import Register from '@/store/Register'
import Login from "@/store/Login";
import Trade from "@/store/Trade";


Vue.use(vuex)

export default new vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopCart,
        Register,
        Login,
        Trade
    }
})