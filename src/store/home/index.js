//home小仓库

//引入api接口
import {reqCategoryList} from "@/api";
import {reqGetbannerList} from "@/api";
import {reqGetfloorList} from "@/api";

//state 仓库储存数据的地方
const state = {
    //定义初始值
    categoryList:[],
    bannerList:[],
    floorList:[],
};

//mutations 修改仓库的唯一手段
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    },
};

//actions  书写自己的业务逻辑，也可以处理异步请求
const actions = {
    //通过api中的接口，向服务器发请求，获取数据
    async categoryList({commit}){
        let result = await reqCategoryList();
        if(result.code===200){
            commit('CATEGORYLIST',result.data)
        }
    },
    async getBannerList({commit}){
        let result = await reqGetbannerList();
        if(result.code===200){
            commit('GETBANNERLIST',result.data)
        }
    },
    async getFloorList({commit}){
        let result = await reqGetfloorList();
        if(result.code===200){
            commit('GETFLOORLIST',result.data)
        }
    },
};

//getters 简化数据仓库，使用数据更加方便
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}