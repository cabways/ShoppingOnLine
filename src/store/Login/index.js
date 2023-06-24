import {reqLogin, reqLogout, reqUserInfo} from "@/api";

const state = {
    userInfo:{}
}
const mutations = {
    REQUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    REQLOGOUT(state){
        state.userInfo = {}
    }
}
const actions = {
    //登录
    async reqLogin(_,data){
        const result =await reqLogin(data)
        if(result.code===200){
            localStorage.setItem('token',result.data.token)
            return 'OK'
        }else {
            return Promise.reject(new Error(result.message))
        }
    },
    //获取用户信息
    async reqUserInfo({commit}){
        let result = await reqUserInfo();
        if(result.code===200){
            commit('REQUSERINFO',result.data)
        }
    },
    //退出登录
    async reqLogout({commit}){
        const result = await reqLogout()
        if(result.code===200){
            commit('REQLOGOUT')
            localStorage.removeItem('token')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}