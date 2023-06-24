//shopCart小仓库
import {reqCartList, reqCheckCart, reqDeleteCartList} from "@/api";

//state 仓库储存数据的地方
const state = {
    cartList: []
};

//mutations 修改仓库的唯一手段
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
};

//actions  书写自己的业务逻辑，也可以处理异步请求
const actions = {
    //获取购物车列表
    async getCartList({commit}) {
        let result = await reqCartList()
        if (result.code === 200) {
            commit('GETCARTLIST', result.data)
        }
    },
//删除购物车中商品
    async reqDeleteCartList(_, skuId) {
        await reqDeleteCartList(skuId)
    },
    //切换商品选中状态
    async reqCheckCart(_, {skuId,isChecked}) {
        await reqCheckCart(skuId,isChecked)
    },
};


//getters 简化数据仓库，使用数据更加方便
const getters = {
    cartList() {
        return state.cartList[0] || {}
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}