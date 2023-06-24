//detail小仓库
import {reqAddOrUpdateShopCard, reqGetGoodInfo} from "@/api";

//state 仓库储存数据的地方
const state = {
    detailInfo: {}
};

//mutations 修改仓库的唯一手段
const mutations = {
    GETDETAILINFO(state, detailInfo) {
        state.detailInfo = detailInfo
    }
};

//actions  书写自己的业务逻辑，也可以处理异步请求
const actions = {
    async getDetailInfo({commit}, skuid) {
        let result = await reqGetGoodInfo(skuid)
        if (result.code === 200) {
            commit('GETDETAILINFO', result.data)
        }
    },
    async reqAddOrUpdateShopCard(_,{skuid, skunum}) {
        let result = await reqAddOrUpdateShopCard(skuid, skunum)
        if(result.code===200){
            return "ok";
        }else{
            return Promise.reject();
        }
    }
};

//getters 简化数据仓库，使用数据更加方便
const getters = {
    categoryView(state) {
        return state.detailInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.detailInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.detailInfo.spuSaleAttrList || []
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}