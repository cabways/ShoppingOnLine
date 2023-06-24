//search小仓库
import {reqGetSearchInfo} from "@/api";


//state 仓库储存数据的地方
const state = {
    SearchList:{}
};

//mutations 修改仓库的唯一手段
const mutations = {
    GETSEARCHLIST(state,SearchList){
        state.SearchList = SearchList
    },
};

//actions  书写自己的业务逻辑，也可以处理异步请求
const actions = {
    async getSearchList({commit},params={}){
        let result = await reqGetSearchInfo(params);
        if(result.code===200){
            commit('GETSEARCHLIST',result.data)
        }
    }
};

//getters 简化数据仓库，使用数据更加方便
const getters = {
    // 利用getter返回商品
    goodsList(state){
        //没有网络的情况下返回空数组
        return state.SearchList.goodsList || [];
    },
    attrsList(state){
        //没有网络的情况下返回空数组
        return state.SearchList.attrsList || [];
    },
    trademarkList(state){
        //没有网络的情况下返回空数组
        return state.SearchList.trademarkList || [];
    },
    total(state){
        return state.SearchList.total
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}