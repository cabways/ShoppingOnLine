import {reqGetUserAddress, reqGetUserTrade} from "@/api";

const state = {
    addressList:[],
    tradeInfo:{}
}
const mutations = {
    REQGETUSERADDRESS(state,addressList){
        state.addressList = addressList
    },
    REQGETUSERTRADE(state,tradeInfo){
        state.tradeInfo = tradeInfo
    }
}
const actions = {
    async reqGetUserAddress({commit}) {
        const result = await reqGetUserAddress()
        if(result.code===200){
            commit('REQGETUSERADDRESS',result.data)
        }
    },
    async reqGetUserTrade({commit}){
        const result = await reqGetUserTrade()
        if(result.code===200){
            commit('REQGETUSERTRADE',result.data)
        }
    }
}
const getters = {
    addressList(state){
        return state.addressList
    },
    tradeInfo(state){
        return state.tradeInfo
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}