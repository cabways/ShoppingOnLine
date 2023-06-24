//引入Vue及vuerouter
import Vue from 'vue'
import VueRouter from 'vue-router'


//使用插件 VueRouter
Vue.use(VueRouter)

//引入一级路由组件
import Home from '../pages/Home/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Detail from '../pages/Detail'
import AddCartSuccess from "@/pages/AddCartSuccess/index.vue";
import shopCart from "@/pages/ShopCart/index.vue";
import trade from "@/pages/Trade/index.vue";
import pay from "@/pages/Pay/index.vue";
import paySuccess from "@/pages/PaySuccess/index.vue";
import center from "@/pages/Center/index.vue";
//引入二级路由组件
import myOrder from "@/pages/Center/myOrder/index.vue";
import groupOrder from "@/pages/Center/groupOrder/index.vue";

//解决编程式路由多次跳转同一页面报错，重写方法，赋予回调
//备份原型对象上的push和replace方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写函数，使其有返回值
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {
        }, () => {
        });
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {
        }, () => {
        });
    }
}


let router = new VueRouter({
    //配置路由
    routes: [
        {
            path: '/center',
            name: 'center',
            component: center,
            meta: {showFooter: true},
            children:[
                {
                    path:'myOrder',
                    component:myOrder
                },
                {
                    path:'groupOrder',
                    component:groupOrder
                },
                {
                    path:'/center',
                    redirect:'/center/myorder'
                }
            ]
        },
        {
            path: '/paysuccess',
            name: 'paysuccess',
            component: paySuccess,
            meta: {showFooter: true},
            beforeEnter:(to, from, next)=>{
                //去paysuccess页面，必须pay来
                if (from.path==='/trade'){
                    next()
                }else {
                    next(false)
                }
            },
        },
        {
            path: '/pay',
            name: 'pay',
            component: pay,
            meta: {showFooter: true},
            beforeEnter:(to, from, next)=>{
                //去pay页面，必须trade来
                if (from.path==='/trade'){
                    next()
                }else {
                    next(false)
                }
            },
        },
        {
            path: '/trade',
            name: 'trade',
            component: trade,
            meta: {showFooter: true},
            beforeEnter:(to, from, next)=>{
                //去交易页面，必须从购物车来
                if (from.path==='/shopcart'){
                    next()
                }else {
                    next(false)
                }
            },
        },
        {
            path: '/shopcart',
            name: 'shopcart',
            component: shopCart,
            meta: {showFooter: true}
        },
        {
            path: '/addcartsuccess',
            name: 'addCartSuccess',
            component: AddCartSuccess,
            meta: {showFooter: true}
        },
        {
            path: '/detail/:skuid',
            component: Detail,
            meta: {showFooter: true}
        },
        {
            path: '/home',
            // 路由懒加载，更高效，更推荐
            component:()=>import('@/pages/Home/Home.vue'),
            meta: {showFooter: true}
        },
        {
            path: '/login',
            component: Login,
            meta: {showFooter: false}
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: Search,
            meta: {showFooter: true}
        },
        {
            path: '/register',
            component: Register,
            meta: {showFooter: false}
        },

        //重定向，默认页面为home页面
        {
            path: '*',
            redirect: '/home'
        }

    ],
    // eslint-disable-next-line no-unused-vars
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return {y: 0}
    },
    //地址栏中的#，默认是有的，兼容性好
    mode: 'history',
})


//路由守卫
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    if (token) {
        if (to.path === '/login') {
            next('/home')
        } else {
            next()
        }
    } else {
        const toPath = to.path
        if (toPath.indexOf('/trade')!==-1||toPath.indexOf('/pay')!==-1||toPath.indexOf('/center')!==-1) {
            next('/login?redirect='+to.path)
        } else {
            next()
        }
    }
})


export default router;
